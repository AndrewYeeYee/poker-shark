<script lang="ts">
	import type { SessionStats } from '$lib/data/types';

	interface Props {
		stats: SessionStats;
	}

	let { stats }: Props = $props();

	let accuracy = $derived(stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0);

	let accuracyColor = $derived(
		accuracy >= 80 ? 'text-green-400' : accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'
	);
</script>

{#if stats.total > 0}
	<div class="flex items-center justify-center gap-6 rounded-lg bg-surface-light px-4 py-2 text-sm">
		<span>
			<span class="font-bold {accuracyColor}">{accuracy}%</span>
			<span class="text-gray-400">accuracy</span>
		</span>
		<span class="text-gray-500">|</span>
		<span>
			<span class="font-bold text-green-400">{stats.correct}</span>
			<span class="text-gray-400">/</span>
			<span class="font-bold text-white">{stats.total}</span>
			<span class="text-gray-400">correct</span>
		</span>
	</div>
{/if}
