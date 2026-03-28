import { buildRange } from '../combos';
import type { Range } from '../types';

// Facing a 3-bet after you opened: actions are 4bet, call, fold
// Key format: "hero:villain" e.g. "UTG:BTN" means hero opened UTG, BTN 3-bet

const facing3BetRanges: Record<string, Range> = {
	// UTG open, facing 3-bet — very tight
	'UTG:BTN': buildRange(
		{
			'4bet': ['AA', 'KK'],
			call: ['QQ', 'JJ', 'AKs', 'AKo']
		},
		'fold'
	),
	'UTG:SB': buildRange(
		{
			'4bet': ['AA', 'KK'],
			call: ['QQ', 'JJ', 'AKs', 'AKo']
		},
		'fold'
	),
	'UTG:BB': buildRange(
		{
			'4bet': ['AA', 'KK'],
			call: ['QQ', 'JJ', 'TT', 'AKs', 'AQs', 'AKo']
		},
		'fold'
	),

	// CO open, facing 3-bet
	'CO:BTN': buildRange(
		{
			'4bet': ['AA', 'KK', 'QQ', 'AKs', 'AKo', 'A5s', 'A4s'],
			call: [
				'JJ', 'TT', '99',
				'AQs', 'AJs', 'ATs',
				'KQs', 'KJs',
				'QJs',
				'JTs',
				'T9s',
				'98s',
				'87s',
				'76s',
				'AQo'
			]
		},
		'fold'
	),
	'CO:SB': buildRange(
		{
			'4bet': ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
			call: [
				'JJ', 'TT',
				'AQs', 'AJs',
				'KQs',
				'AQo'
			]
		},
		'fold'
	),
	'CO:BB': buildRange(
		{
			'4bet': ['AA', 'KK', 'QQ', 'AKs', 'AKo', 'A5s'],
			call: [
				'JJ', 'TT', '99',
				'AQs', 'AJs', 'ATs',
				'KQs', 'KJs',
				'QJs',
				'JTs',
				'T9s',
				'98s',
				'AQo'
			]
		},
		'fold'
	),

	// BTN open, facing 3-bet — wider defense
	'BTN:SB': buildRange(
		{
			'4bet': [
				'AA', 'KK', 'QQ', 'JJ',
				'AKs', 'AQs',
				'AKo',
				'A5s', 'A4s', 'A3s'
			],
			call: [
				'TT', '99', '88', '77',
				'AJs', 'ATs', 'A9s', 'A8s',
				'KQs', 'KJs', 'KTs',
				'QJs', 'QTs',
				'JTs', 'J9s',
				'T9s', 'T8s',
				'98s', '97s',
				'87s', '86s',
				'76s', '75s',
				'65s',
				'54s',
				'AQo', 'AJo'
			]
		},
		'fold'
	),
	'BTN:BB': buildRange(
		{
			'4bet': [
				'AA', 'KK', 'QQ', 'JJ',
				'AKs', 'AQs',
				'AKo',
				'A5s', 'A4s'
			],
			call: [
				'TT', '99', '88', '77', '66',
				'AJs', 'ATs', 'A9s', 'A8s', 'A7s',
				'KQs', 'KJs', 'KTs', 'K9s',
				'QJs', 'QTs', 'Q9s',
				'JTs', 'J9s',
				'T9s', 'T8s',
				'98s', '97s',
				'87s', '86s',
				'76s', '75s',
				'65s', '64s',
				'54s',
				'AQo', 'AJo', 'ATo'
			]
		},
		'fold'
	)
};

export default facing3BetRanges;
