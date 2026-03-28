<script lang="ts">
	import type { Action } from '$lib/data/types';

	interface Props {
		actions: Action[];
		onaction: (action: Action) => void;
		disabled?: boolean;
	}

	let { actions, onaction, disabled = false }: Props = $props();

	const actionStyles: Record<Action, string> = {
		raise: 'bg-green-600 hover:bg-green-500 border-green-500',
		'3bet': 'bg-green-600 hover:bg-green-500 border-green-500',
		'4bet': 'bg-green-600 hover:bg-green-500 border-green-500',
		squeeze: 'bg-green-600 hover:bg-green-500 border-green-500',
		call: 'bg-blue-600 hover:bg-blue-500 border-blue-500',
		fold: 'bg-red-600 hover:bg-red-500 border-red-500'
	};

	const actionLabels: Record<Action, string> = {
		raise: 'Raise',
		'3bet': '3-Bet',
		'4bet': '4-Bet',
		squeeze: 'Squeeze',
		call: 'Call',
		fold: 'Fold'
	};

	function handleKeydown(e: KeyboardEvent) {
		if (disabled) return;
		const idx = parseInt(e.key) - 1;
		if (idx >= 0 && idx < actions.length) {
			onaction(actions[idx]);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex gap-3">
	{#each actions as action, i}
		<button
			onclick={() => onaction(action)}
			{disabled}
			class="flex-1 cursor-pointer rounded-xl border-2 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all
				{actionStyles[action]}
				disabled:cursor-not-allowed disabled:opacity-50"
		>
			<span class="text-xs text-white/60">{i + 1}</span>
			{actionLabels[action]}
		</button>
	{/each}
</div>
