import { buildRange } from '../combos';
import type { Range } from '../types';

// Squeeze spots: villain opened, caller cold-called, hero acts
// Key format: "hero:villain:caller"
// Actions: squeeze, call, fold

const squeezeRanges: Record<string, Range> = {
	// BTN squeeze vs UTG open + MP call
	'BTN:UTG:MP': buildRange(
		{
			squeeze: ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
			call: ['JJ', 'TT', 'AQs', 'AJs', 'KQs']
		},
		'fold'
	),

	// SB squeeze vs various opens + calls
	'SB:UTG:MP': buildRange(
		{
			squeeze: ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
			call: []
		},
		'fold'
	),
	'SB:CO:BTN': buildRange(
		{
			squeeze: [
				'AA', 'KK', 'QQ', 'JJ', 'TT',
				'AKs', 'AQs', 'AJs',
				'AKo', 'AQo',
				'A5s', 'A4s'
			],
			call: []
		},
		'fold'
	),
	'SB:UTG:CO': buildRange(
		{
			squeeze: ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
			call: []
		},
		'fold'
	),

	// BB squeeze vs various opens + calls
	'BB:UTG:MP': buildRange(
		{
			squeeze: ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
			call: [
				'JJ', 'TT', '99', '88', '77',
				'AQs', 'AJs', 'ATs',
				'KQs', 'KJs',
				'QJs',
				'JTs',
				'T9s',
				'98s',
				'87s',
				'76s',
				'65s'
			]
		},
		'fold'
	),
	'BB:CO:BTN': buildRange(
		{
			squeeze: [
				'AA', 'KK', 'QQ', 'JJ',
				'AKs', 'AQs', 'AJs',
				'AKo', 'AQo',
				'A5s', 'A4s', 'A3s'
			],
			call: [
				'TT', '99', '88', '77', '66', '55', '44',
				'ATs', 'A9s', 'A8s', 'A7s', 'A6s',
				'KQs', 'KJs', 'KTs', 'K9s',
				'QJs', 'QTs', 'Q9s',
				'JTs', 'J9s',
				'T9s', 'T8s',
				'98s', '97s',
				'87s', '86s',
				'76s', '75s',
				'65s', '64s',
				'54s',
				'AJo', 'ATo',
				'KQo', 'KJo',
				'QJo',
				'JTo'
			]
		},
		'fold'
	),
	'BB:MP:CO': buildRange(
		{
			squeeze: [
				'AA', 'KK', 'QQ',
				'AKs', 'AKo'
			],
			call: [
				'JJ', 'TT', '99', '88', '77', '66',
				'AQs', 'AJs', 'ATs', 'A9s',
				'KQs', 'KJs', 'KTs',
				'QJs', 'QTs',
				'JTs', 'J9s',
				'T9s', 'T8s',
				'98s', '97s',
				'87s', '86s',
				'76s',
				'65s',
				'54s',
				'AQo'
			]
		},
		'fold'
	),
	'BB:UTG:BTN': buildRange(
		{
			squeeze: ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
			call: [
				'JJ', 'TT', '99', '88', '77', '66',
				'AQs', 'AJs', 'ATs', 'A9s',
				'KQs', 'KJs', 'KTs',
				'QJs', 'QTs',
				'JTs', 'J9s',
				'T9s',
				'98s',
				'87s',
				'76s',
				'65s',
				'AQo'
			]
		},
		'fold'
	)
};

export default squeezeRanges;
