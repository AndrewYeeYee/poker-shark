<script lang="ts">
	import { SUIT_COLORS, SUIT_SYMBOLS } from '$lib/data/constants';
	import type { Card } from '$lib/data/types';

	interface Props {
		card: Card;
		size?: 'sm' | 'md' | 'lg';
	}

	let { card, size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'w-12 h-16 text-lg',
		md: 'w-16 h-22 text-2xl',
		lg: 'w-20 h-28 text-3xl'
	};
</script>

<div
	class="inline-flex flex-col items-center justify-center rounded-lg border border-card-border bg-card-bg font-bold shadow-lg {sizeClasses[size]}"
>
	<span class={SUIT_COLORS[card.suit]}>
		{card.rank}{SUIT_SYMBOLS[card.suit]}
	</span>
</div>
