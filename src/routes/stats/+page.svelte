<script lang="ts">
	import { getSession, getPersistent, resetAllStats, endSession } from '$lib/state/stats.svelte';
	import type { ScenarioType } from '$lib/data/types';

	let showConfirmReset = $state(false);
	let persistent = $derived(getPersistent());
	let session = $derived(getSession());
	let weakest = $derived(
		Object.entries(persistent.byScenarioKey)
			.filter(([, v]) => v.total >= 5)
			.sort(([, a], [, b]) => a.correct / a.total - b.correct / b.total)
			.slice(0, 10)
	);

	const scenarioLabels: Record<ScenarioType, string> = {
		rfi: 'RFI',
		facing_raise: 'Facing Raise',
		facing_3bet: 'Facing 3-Bet',
		squeeze: 'Squeeze'
	};

	function accuracy(correct: number, total: number): string {
		if (total === 0) return '-';
		return `${Math.round((correct / total) * 100)}%`;
	}

	function handleReset() {
		resetAllStats();
		showConfirmReset = false;
	}

	function handleEndSession() {
		endSession();
	}
</script>

<div class="flex flex-col gap-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold">Stats</h1>
		<div class="flex gap-2">
			<button
				onclick={handleEndSession}
				class="cursor-pointer rounded-lg bg-surface-light px-3 py-1.5 text-sm text-gray-300 hover:bg-surface-lighter"
			>
				End Session
			</button>
			{#if !showConfirmReset}
				<button
					onclick={() => (showConfirmReset = true)}
					class="cursor-pointer rounded-lg bg-red-600/30 px-3 py-1.5 text-sm text-red-300 hover:bg-red-600/50"
				>
					Reset All
				</button>
			{:else}
				<button
					onclick={handleReset}
					class="cursor-pointer rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
				>
					Confirm Reset
				</button>
				<button
					onclick={() => (showConfirmReset = false)}
					class="cursor-pointer rounded-lg bg-surface-light px-3 py-1.5 text-sm text-gray-300"
				>
					Cancel
				</button>
			{/if}
		</div>
	</div>

	<!-- Lifetime stats -->
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="rounded-xl border border-surface-lighter bg-surface-light p-4 text-center">
			<div class="text-3xl font-bold text-accent">
				{accuracy(persistent.lifetimeCorrect, persistent.lifetimeTotal)}
			</div>
			<div class="text-sm text-gray-400">Lifetime Accuracy</div>
		</div>
		<div class="rounded-xl border border-surface-lighter bg-surface-light p-4 text-center">
			<div class="text-3xl font-bold text-white">{persistent.lifetimeTotal}</div>
			<div class="text-sm text-gray-400">Total Hands</div>
		</div>
		<div class="rounded-xl border border-surface-lighter bg-surface-light p-4 text-center">
			<div class="text-3xl font-bold text-green-400">{persistent.lifetimeCorrect}</div>
			<div class="text-sm text-gray-400">Correct</div>
		</div>
	</div>

	<!-- Current session -->
	{#if session.total > 0}
		<div class="rounded-xl border border-surface-lighter bg-surface-light p-4">
			<h2 class="mb-3 text-lg font-semibold">Current Session</h2>
			<div class="flex gap-6 text-sm">
				<span>
					Accuracy: <span class="font-bold text-accent">{accuracy(session.correct, session.total)}</span>
				</span>
				<span>
					Hands: <span class="font-bold text-white">{session.total}</span>
				</span>
			</div>

			<!-- By scenario type -->
			{#if Object.values(session.byScenarioType).some((v) => v.total > 0)}
				<div class="mt-3">
					<h3 class="mb-1 text-xs font-semibold text-gray-400">By Scenario</h3>
					<div class="flex flex-wrap gap-3 text-sm">
						{#each Object.entries(session.byScenarioType) as [type, stats]}
							{#if stats.total > 0}
								<span class="rounded bg-surface px-2 py-1">
									{scenarioLabels[type as ScenarioType]}:
									<span class="font-semibold">{accuracy(stats.correct, stats.total)}</span>
									<span class="text-gray-500">({stats.total})</span>
								</span>
							{/if}
						{/each}
					</div>
				</div>
			{/if}

			<!-- By position -->
			{#if Object.keys(session.byPosition).length > 0}
				<div class="mt-3">
					<h3 class="mb-1 text-xs font-semibold text-gray-400">By Position</h3>
					<div class="flex flex-wrap gap-3 text-sm">
						{#each Object.entries(session.byPosition) as [pos, stats]}
							{#if stats && stats.total > 0}
								<span class="rounded bg-surface px-2 py-1">
									<span class="font-mono">{pos}</span>:
									<span class="font-semibold">{accuracy(stats.correct, stats.total)}</span>
									<span class="text-gray-500">({stats.total})</span>
								</span>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Session history -->
	{#if persistent.sessions.length > 0}
		<div class="rounded-xl border border-surface-lighter bg-surface-light p-4">
			<h2 class="mb-3 text-lg font-semibold">Session History</h2>
			<div class="space-y-2">
				{#each persistent.sessions.toReversed().slice(0, 20) as s}
					<div class="flex items-center justify-between rounded bg-surface px-3 py-2 text-sm">
						<span class="text-gray-400">{new Date(s.date).toLocaleDateString()}</span>
						<span class="text-gray-300">{s.scenarioType}</span>
						<span>
							<span class="font-bold">{accuracy(s.correct, s.total)}</span>
							<span class="text-gray-500">({s.correct}/{s.total})</span>
						</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Weakest spots -->
	{#if weakest.length > 0}
			<div class="rounded-xl border border-surface-lighter bg-surface-light p-4">
				<h2 class="mb-3 text-lg font-semibold">Weakest Spots</h2>
				<div class="space-y-2">
					{#each weakest as [key, stats]}
						<div class="flex items-center justify-between rounded bg-surface px-3 py-2 text-sm">
							<span class="font-mono text-gray-300">{key}</span>
							<span>
								<span class="font-bold {stats.correct / stats.total < 0.6 ? 'text-red-400' : 'text-yellow-400'}">
									{accuracy(stats.correct, stats.total)}
								</span>
								<span class="text-gray-500">({stats.total} hands)</span>
							</span>
						</div>
					{/each}
				</div>
			</div>
	{/if}
</div>
