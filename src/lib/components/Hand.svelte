<script lang="ts">
	import type { Card as CardType } from '$lib/data/types';
	import Card from './Card.svelte';

	interface Props {
		card1: CardType;
		card2: CardType;
		size?: 'sm' | 'md' | 'lg';
	}

	let { card1, card2, size = 'lg' }: Props = $props();
</script>

<div class="inline-flex gap-2">
	<Card card={card1} {size} />
	<Card card={card2} {size} />
</div>
