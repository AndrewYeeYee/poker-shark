<script lang="ts">
	import RangeGrid from '$lib/components/RangeGrid.svelte';
	import { allDefaultScenarioKeys, getDefaultRange } from '$lib/data/ranges';
	import { scenarioKey } from '$lib/data/scenarios';
	import type { Action, Position, Range, ScenarioType } from '$lib/data/types';
	import { POSITIONS } from '$lib/data/types';
	import {
		getCustomRange,
		hasCustomRange,
		setCustomRange,
		resetCustomRange,
		exportRanges,
		importRanges
	} from '$lib/state/custom-ranges.svelte';

	let selectedType = $state<ScenarioType>('rfi');
	let heroPosition = $state<Position>('UTG');
	let villainPosition = $state<Position>('UTG');
	let callerPosition = $state<Position>('MP');
	let editMode = $state(false);
	let showCustom = $state(false);
	let selectedAction = $state<Action>('raise');
	let showImportExport = $state(false);
	let importText = $state('');

	const scenarioTypes: { value: ScenarioType; label: string }[] = [
		{ value: 'rfi', label: 'Raise First In' },
		{ value: 'facing_raise', label: 'Facing a Raise' },
		{ value: 'facing_3bet', label: 'Facing a 3-Bet' },
		{ value: 'squeeze', label: 'Squeeze' }
	];

	let currentKey = $derived.by(() => {
		switch (selectedType) {
			case 'rfi':
				return `rfi:${heroPosition}`;
			case 'facing_raise':
				return `facing_raise:${heroPosition}:${villainPosition}`;
			case 'facing_3bet':
				return `facing_3bet:${heroPosition}:${villainPosition}`;
			case 'squeeze':
				return `squeeze:${heroPosition}:${villainPosition}:${callerPosition}`;
		}
	});

	let currentRange = $derived.by(() => {
		if (showCustom) {
			const custom = getCustomRange(currentKey);
			if (custom) return custom;
		}
		return getDefaultRange(currentKey);
	});

	let editableRange = $state<Range>({});

	function startEdit() {
		if (!currentRange) return;
		editableRange = { ...currentRange };
		editMode = true;
	}

	function cancelEdit() {
		editMode = false;
	}

	function saveEdit() {
		setCustomRange(currentKey, editableRange);
		showCustom = true;
		editMode = false;
	}

	function resetToDefault() {
		resetCustomRange(currentKey);
		editMode = false;
	}

	function handleCellToggle(comboLabel: string, action: Action) {
		editableRange = { ...editableRange, [comboLabel]: action };
	}

	function handleExport() {
		const data = exportRanges();
		navigator.clipboard.writeText(data);
	}

	function handleImport() {
		try {
			const data = JSON.parse(importText);
			importRanges(data);
			showImportExport = false;
			importText = '';
			showCustom = true;
		} catch {
			alert('Invalid JSON');
		}
	}

	const actionPalette: { value: Action; label: string; color: string }[] = [
		{ value: 'raise', label: 'Raise', color: 'bg-green-600' },
		{ value: '3bet', label: '3-Bet', color: 'bg-green-600' },
		{ value: '4bet', label: '4-Bet', color: 'bg-green-700' },
		{ value: 'squeeze', label: 'Squeeze', color: 'bg-green-600' },
		{ value: 'call', label: 'Call', color: 'bg-blue-600' },
		{ value: 'fold', label: 'Fold', color: 'bg-gray-700' }
	];

	let needsVillain = $derived(
		selectedType === 'facing_raise' ||
			selectedType === 'facing_3bet' ||
			selectedType === 'squeeze'
	);
	let needsCaller = $derived(selectedType === 'squeeze');
</script>

<div class="flex flex-col gap-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold">Hand Ranges</h1>
		<div class="flex gap-2">
			<button
				onclick={() => (showImportExport = !showImportExport)}
				class="cursor-pointer rounded-lg bg-surface-light px-3 py-1.5 text-sm text-gray-300 hover:bg-surface-lighter"
			>
				Import/Export
			</button>
		</div>
	</div>

	<!-- Scenario selectors -->
	<div class="flex flex-wrap gap-4">
		<label class="flex flex-col gap-1">
			<span class="text-xs text-gray-400">Scenario</span>
			<select bind:value={selectedType} class="rounded-lg border border-surface-lighter bg-surface-light px-3 py-1.5 text-sm text-white">
				{#each scenarioTypes as st}
					<option value={st.value}>{st.label}</option>
				{/each}
			</select>
		</label>

		<label class="flex flex-col gap-1">
			<span class="text-xs text-gray-400">{selectedType === 'facing_3bet' ? 'Your Position (Opener)' : 'Hero Position'}</span>
			<select bind:value={heroPosition} class="rounded-lg border border-surface-lighter bg-surface-light px-3 py-1.5 text-sm text-white">
				{#each POSITIONS as pos}
					<option value={pos}>{pos}</option>
				{/each}
			</select>
		</label>

		{#if needsVillain}
			<label class="flex flex-col gap-1">
				<span class="text-xs text-gray-400">{selectedType === 'facing_3bet' ? '3-Bettor' : 'Raiser'}</span>
				<select bind:value={villainPosition} class="rounded-lg border border-surface-lighter bg-surface-light px-3 py-1.5 text-sm text-white">
					{#each POSITIONS as pos}
						<option value={pos}>{pos}</option>
					{/each}
				</select>
			</label>
		{/if}

		{#if needsCaller}
			<label class="flex flex-col gap-1">
				<span class="text-xs text-gray-400">Caller</span>
				<select bind:value={callerPosition} class="rounded-lg border border-surface-lighter bg-surface-light px-3 py-1.5 text-sm text-white">
					{#each POSITIONS as pos}
						<option value={pos}>{pos}</option>
					{/each}
				</select>
			</label>
		{/if}
	</div>

	<!-- Custom/Default toggle -->
	<div class="flex items-center gap-4">
		<div class="flex gap-2">
			<button
				onclick={() => { showCustom = false; editMode = false; }}
				class="cursor-pointer rounded-lg px-3 py-1 text-sm transition-colors
					{!showCustom ? 'bg-accent text-black font-semibold' : 'bg-surface-light text-gray-400 hover:text-white'}"
			>
				Default
			</button>
			<button
				onclick={() => { showCustom = true; editMode = false; }}
				class="cursor-pointer rounded-lg px-3 py-1 text-sm transition-colors
					{showCustom ? 'bg-accent text-black font-semibold' : 'bg-surface-light text-gray-400 hover:text-white'}"
			>
				Custom {hasCustomRange(currentKey) ? '*' : ''}
			</button>
		</div>

		{#if !editMode}
			<button
				onclick={startEdit}
				disabled={!currentRange}
				class="cursor-pointer rounded-lg bg-surface-light px-3 py-1 text-sm text-gray-300 hover:bg-surface-lighter disabled:opacity-50"
			>
				Edit
			</button>
		{:else}
			<button
				onclick={saveEdit}
				class="cursor-pointer rounded-lg bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-500"
			>
				Save
			</button>
			<button
				onclick={cancelEdit}
				class="cursor-pointer rounded-lg bg-surface-light px-3 py-1 text-sm text-gray-300 hover:bg-surface-lighter"
			>
				Cancel
			</button>
			<button
				onclick={resetToDefault}
				class="cursor-pointer rounded-lg bg-red-600/50 px-3 py-1 text-sm text-red-300 hover:bg-red-600"
			>
				Reset
			</button>
		{/if}
	</div>

	<!-- Action palette (edit mode) -->
	{#if editMode}
		<div class="flex items-center gap-2">
			<span class="text-xs text-gray-400">Paint with:</span>
			{#each actionPalette as ap}
				<button
					onclick={() => (selectedAction = ap.value)}
					class="cursor-pointer rounded px-2 py-0.5 text-xs font-medium text-white transition-colors
						{ap.color}
						{selectedAction === ap.value ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'}"
				>
					{ap.label}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Range grid -->
	{#if currentRange || editMode}
		<RangeGrid
			range={editMode ? editableRange : (currentRange ?? {})}
			editable={editMode}
			{selectedAction}
			oncelltoggle={handleCellToggle}
		/>
	{:else}
		<div class="rounded-xl border border-surface-lighter bg-surface-light p-8 text-center">
			<p class="text-gray-400">No range data available for this scenario.</p>
			<p class="mt-1 text-sm text-gray-500">Key: <code class="font-mono">{currentKey}</code></p>
		</div>
	{/if}

	<!-- Import/Export panel -->
	{#if showImportExport}
		<div class="rounded-xl border border-surface-lighter bg-surface-light p-4">
			<h3 class="mb-3 text-sm font-semibold text-gray-300">Import / Export Custom Ranges</h3>
			<div class="flex gap-2">
				<button
					onclick={handleExport}
					class="cursor-pointer rounded-lg bg-accent/20 px-4 py-2 text-sm text-accent hover:bg-accent/30"
				>
					Copy to Clipboard
				</button>
			</div>
			<div class="mt-3">
				<textarea
					bind:value={importText}
					placeholder="Paste JSON here..."
					rows="4"
					class="w-full rounded-lg border border-surface-lighter bg-surface p-2 text-sm text-white placeholder-gray-500"
				></textarea>
				<button
					onclick={handleImport}
					disabled={!importText}
					class="mt-2 cursor-pointer rounded-lg bg-green-600 px-4 py-1.5 text-sm text-white hover:bg-green-500 disabled:opacity-50"
				>
					Import
				</button>
			</div>
		</div>
	{/if}

	<!-- Legend -->
	<div class="flex items-center gap-4 text-xs text-gray-400">
		<span>Legend:</span>
		<span class="flex items-center gap-1"><span class="inline-block h-3 w-3 rounded bg-green-600"></span> Raise/3-bet/4-bet/Squeeze</span>
		<span class="flex items-center gap-1"><span class="inline-block h-3 w-3 rounded bg-blue-600"></span> Call</span>
		<span class="flex items-center gap-1"><span class="inline-block h-3 w-3 rounded bg-gray-700"></span> Fold</span>
	</div>
</div>
