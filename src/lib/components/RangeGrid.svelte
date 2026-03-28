<script lang="ts">
	import { GRID } from '$lib/data/combos';
	import { RANKS } from '$lib/data/constants';
	import type { Action, Range } from '$lib/data/types';

	interface Props {
		range: Range;
		editable?: boolean;
		selectedAction?: Action;
		oncelltoggle?: (comboLabel: string, action: Action) => void;
	}

	let { range, editable = false, selectedAction = 'raise', oncelltoggle }: Props = $props();

	let isPainting = $state(false);

	const actionColors: Record<string, string> = {
		raise: 'bg-green-600',
		'3bet': 'bg-green-600',
		'4bet': 'bg-green-700',
		squeeze: 'bg-green-600',
		call: 'bg-blue-600',
		fold: 'bg-gray-700'
	};

	function handleMouseDown(label: string) {
		if (!editable || !oncelltoggle || !selectedAction) return;
		isPainting = true;
		oncelltoggle(label, selectedAction);
	}

	function handleMouseEnter(label: string) {
		if (!isPainting || !editable || !oncelltoggle || !selectedAction) return;
		oncelltoggle(label, selectedAction);
	}

	function handleMouseUp() {
		isPainting = false;
	}
</script>

<svelte:window onmouseup={handleMouseUp} />

<div class="overflow-x-auto">
	<table class="border-collapse select-none" role="grid">
		<thead>
			<tr>
				<th class="h-7 w-7"></th>
				{#each RANKS as rank}
					<th class="h-7 w-11 text-center text-xs font-medium text-gray-400">{rank}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each GRID as row, rowIdx}
				<tr>
					<th class="w-7 text-center text-xs font-medium text-gray-400">{RANKS[rowIdx]}</th>
					{#each row as combo}
						<td
							class="h-9 w-11 border border-surface/50 text-center text-[10px] font-semibold leading-tight transition-colors
								{actionColors[range[combo.label] ?? 'fold']}
								{editable ? 'cursor-pointer hover:brightness-125' : ''}
								{combo.suitedness === 'pair' ? 'ring-1 ring-white/20' : ''}"
							onmousedown={() => handleMouseDown(combo.label)}
							onmouseenter={() => handleMouseEnter(combo.label)}
							role="gridcell"
						>
							{combo.label}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
