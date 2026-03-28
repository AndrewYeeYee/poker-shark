import { RANKS, SUITS } from './constants';
import type { Card } from './types';

export function buildDeck(): Card[] {
	const deck: Card[] = [];
	for (const suit of SUITS) {
		for (const rank of RANKS) {
			deck.push({ rank, suit });
		}
	}
	return deck;
}

export function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export function dealTwo(): [Card, Card] {
	const deck = shuffle(buildDeck());
	return [deck[0], deck[1]];
}
