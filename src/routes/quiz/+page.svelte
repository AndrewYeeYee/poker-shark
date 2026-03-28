<script lang="ts">
	import { onMount } from 'svelte';
	import Hand from '$lib/components/Hand.svelte';
	import ActionButtons from '$lib/components/ActionButtons.svelte';
	import Feedback from '$lib/components/Feedback.svelte';
	import ScenarioInfo from '$lib/components/ScenarioInfo.svelte';
	import StatsBar from '$lib/components/StatsBar.svelte';
	import {
		nextQuestion,
		submitAnswer,
		getCurrentQuestion,
		getFeedback,
		getAvailableActions
	} from '$lib/state/quiz.svelte';
	import { getSession } from '$lib/state/stats.svelte';
	import { getSettings, updateSettings } from '$lib/state/settings.svelte';
	import { POSITIONS, type Action, type Position, type ScenarioType } from '$lib/data/types';
	import { allDefaultScenarioKeys } from '$lib/data/ranges';

	let showSettings = $state(false);

	const scenarioTypeOptions: { value: ScenarioType; label: string }[] = [
		{ value: 'rfi', label: 'Raise First In' },
		{ value: 'facing_raise', label: 'Facing a Raise' },
		{ value: 'facing_3bet', label: 'Facing a 3-Bet' },
		{ value: 'squeeze', label: 'Squeeze' }
	];

	function handleAction(action: Action) {
		submitAnswer(action);
	}

	function handleNext() {
		nextQuestion();
	}

	function toggleScenarioType(type: ScenarioType) {
		const settings = getSettings();
		const current = settings.scenarioTypes;
		if (current.includes(type)) {
			if (current.length > 1) {
				updateSettings({ scenarioTypes: current.filter((t) => t !== type) });
			}
		} else {
			updateSettings({ scenarioTypes: [...current, type] });
		}
	}

	function togglePosition(pos: Position) {
		const settings = getSettings();
		const current = settings.positions;
		if (current.includes(pos)) {
			if (current.length > 1) {
				updateSettings({ positions: current.filter((p) => p !== pos) });
			}
		} else {
			updateSettings({ positions: [...current, pos] });
		}
	}

	onMount(() => {
		nextQuestion();
	});

	// Check available ranges count
	let rangeCount = $derived(allDefaultScenarioKeys().length);
</script>

<div class="flex flex-col gap-6">
	<!-- Header with settings toggle -->
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold">Hand Range Quiz</h1>
		<button
			onclick={() => (showSettings = !showSettings)}
			class="cursor-pointer rounded-lg bg-surface-light px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-surface-lighter"
		>
			{showSettings ? 'Hide' : 'Settings'}
		</button>
	</div>

	<!-- Settings panel -->
	{#if showSettings}
		<div class="rounded-xl border border-surface-lighter bg-surface-light p-4">
			<div class="mb-3">
				<h3 class="mb-2 text-sm font-semibold text-gray-300">Scenario Types</h3>
				<div class="flex flex-wrap gap-2">
					{#each scenarioTypeOptions as opt}
						<button
							onclick={() => toggleScenarioType(opt.value)}
							class="cursor-pointer rounded-lg border px-3 py-1 text-sm transition-colors
								{getSettings().scenarioTypes.includes(opt.value)
								? 'border-accent bg-accent/20 text-accent'
								: 'border-surface-lighter text-gray-400 hover:border-gray-500'}"
						>
							{opt.label}
						</button>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="mb-2 text-sm font-semibold text-gray-300">Hero Positions</h3>
				<div class="flex flex-wrap gap-2">
					{#each POSITIONS as pos}
						<button
							onclick={() => togglePosition(pos)}
							class="cursor-pointer rounded-lg border px-2 py-1 text-xs font-mono transition-colors
								{getSettings().positions.includes(pos)
								? 'border-accent bg-accent/20 text-accent'
								: 'border-surface-lighter text-gray-400 hover:border-gray-500'}"
						>
							{pos}
						</button>
					{/each}
				</div>
			</div>
			<div class="mt-3">
				<label class="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
					<input
						type="checkbox"
						checked={getSettings().useCustomRanges}
						onchange={() => updateSettings({ useCustomRanges: !getSettings().useCustomRanges })}
						class="accent-accent"
					/>
					Use custom ranges (where available)
				</label>
			</div>
			<p class="mt-3 text-xs text-gray-500">{rangeCount} ranges available</p>
		</div>
	{/if}

	<!-- Quiz area -->
	{#if getCurrentQuestion()}
		{@const question = getCurrentQuestion()!}
		{@const fb = getFeedback()}

		<div class="flex flex-col items-center gap-6">
			<ScenarioInfo scenario={question.scenario} />
			<Hand card1={question.card1} card2={question.card2} />

			{#if fb}
				<div class="w-full max-w-md">
					<Feedback feedback={fb} onnext={handleNext} />
				</div>
			{:else}
				<div class="w-full max-w-md">
					<ActionButtons actions={getAvailableActions()} onaction={handleAction} />
				</div>
			{/if}
		</div>
	{:else}
		<div class="py-12 text-center">
			<p class="text-gray-400">
				No ranges available for current settings. Try enabling more scenario types or positions.
			</p>
			<button
				onclick={() => (showSettings = true)}
				class="mt-4 cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black"
			>
				Open Settings
			</button>
		</div>
	{/if}

	<!-- Session stats -->
	<StatsBar stats={getSession()} />
</div>
