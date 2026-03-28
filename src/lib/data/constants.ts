import type { Rank, Suit } from './types';

export const RANKS: Rank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

export const SUIT_SYMBOLS: Record<Suit, string> = {
	spades: '\u2660',
	hearts: '\u2665',
	diamonds: '\u2666',
	clubs: '\u2663'
};

// 4-color deck (standard online poker convention)
export const SUIT_COLORS: Record<Suit, string> = {
	spades: 'text-gray-100',
	hearts: 'text-red-500',
	diamonds: 'text-blue-400',
	clubs: 'text-green-400'
};

export const RANK_INDEX: Record<Rank, number> = {
	A: 0,
	K: 1,
	Q: 2,
	J: 3,
	T: 4,
	'9': 5,
	'8': 6,
	'7': 7,
	'6': 8,
	'5': 9,
	'4': 10,
	'3': 11,
	'2': 12
};
