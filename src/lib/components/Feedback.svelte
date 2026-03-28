<script lang="ts">
	import type { Action, QuizFeedback } from '$lib/data/types';

	interface Props {
		feedback: QuizFeedback;
		onnext: () => void;
	}

	let { feedback, onnext }: Props = $props();

	const actionLabels: Record<Action, string> = {
		raise: 'Raise',
		'3bet': '3-Bet',
		'4bet': '4-Bet',
		squeeze: 'Squeeze',
		call: 'Call',
		fold: 'Fold'
	};

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			onnext();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="rounded-xl border-2 p-4 text-center
		{feedback.isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}"
>
	<div class="text-2xl font-bold {feedback.isCorrect ? 'text-green-400' : 'text-red-400'}">
		{feedback.isCorrect ? 'Correct!' : 'Incorrect'}
	</div>

	{#if !feedback.isCorrect}
		<p class="mt-1 text-gray-300">
			You chose <span class="font-semibold text-red-300">{actionLabels[feedback.userAction]}</span>
			— correct action was
			<span class="font-semibold text-green-300">{actionLabels[feedback.correctAction]}</span>
		</p>
	{/if}

	<p class="mt-1 text-sm text-gray-400">
		Hand: <span class="font-mono font-semibold">{feedback.comboLabel}</span>
	</p>

	<button
		onclick={onnext}
		class="mt-3 cursor-pointer rounded-lg bg-surface-lighter px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
	>
		Next Hand <span class="text-xs text-gray-400">(Space)</span>
	</button>
</div>
