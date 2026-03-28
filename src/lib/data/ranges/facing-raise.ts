import { buildRange } from '../combos';
import type { Range } from '../types';

// Facing a raise: actions are 3bet, call, fold
// Key format: "hero:villain" e.g. "CO:UTG" means hero on CO facing UTG open

const facingRaiseRanges: Record<string, Range> = {
	// Facing UTG open — tight response
	'MP:UTG': buildRange(
		{
			'3bet': ['AA', 'KK', 'AKs'],
			call: ['QQ', 'JJ', 'TT', 'AQs', 'AJs', 'KQs']
		},
		'fold'
	),
	'CO:UTG': buildRange(
		{
			'3bet': ['AA', 'KK', 'AKs'],
			call: ['QQ', 'JJ', 'TT', '99', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'QJs', 'JTs']
		},
		'fold'
	),
	'BTN:UTG': buildRange(
		{
			'3bet': ['AA', 'KK', 'AKs', 'AKo'],
			call: [
				'QQ', 'JJ', 'TT', '99', '88',
				'AQs', 'AJs', 'ATs', 'A9s',
				'KQs', 'KJs', 'KTs',
				'QJs', 'QTs',
				'JTs', 'J9s',
				'T9s',
				'98s',
				'87s',
				'76s'
			]
		},
		'fold'
	),
	'SB:UTG': buildRange(
		{
			'3bet': ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
			call: ['JJ', 'TT', 'AQs', 'AJs']
		},
		'fold'
	),
	'BB:UTG': buildRange(
		{
			'3bet': ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
			call: [
				'JJ', 'TT', '99', '88', '77', '66', '55',
				'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s',
				'KQs', 'KJs', 'KTs', 'K9s',
				'QJs', 'QTs', 'Q9s',
				'JTs', 'J9s',
				'T9s', 'T8s',
				'98s', '97s',
				'87s', '86s',
				'76s', '75s',
				'65s', '64s',
				'54s',
				'AQo'
			]
		},
		'fold'
	),

	// Facing CO open — medium response
	'BTN:CO': buildRange(
		{
			'3bet': [
				'AA', 'KK', 'QQ', 'JJ',
				'AKs', 'AQs', 'AJs',
				'AKo', 'AQo',
				'A5s', 'A4s'
			],
			call: [
				'TT', '99', '88', '77', '66', '55',
				'ATs', 'A9s', 'A8s', 'A7s', 'A6s',
				'KQs', 'KJs', 'KTs', 'K9s',
				'QJs', 'QTs', 'Q9s',
				'JTs', 'J9s', 'J8s',
				'T9s', 'T8s',
				'98s', '97s',
				'87s', '86s',
				'76s', '75s',
				'65s', '64s',
				'54s', '53s',
				'43s',
				'AJo', 'ATo',
				'KQo', 'KJo',
				'QJo',
				'JTo'
			]
		},
		'fold'
	),
	'SB:CO': buildRange(
		{
			'3bet': [
				'AA', 'KK', 'QQ', 'JJ', 'TT',
				'AKs', 'AQs', 'AJs', 'ATs',
				'AKo', 'AQo',
				'A5s', 'A4s'
			],
			call: ['99', '88', 'KQs', 'KJs']
		},
		'fold'
	),
	'BB:CO': buildRange(
		{
			'3bet': [
				'AA', 'KK', 'QQ', 'JJ',
				'AKs', 'AQs', 'AJs',
				'AKo', 'AQo',
				'A5s', 'A4s', 'A3s'
			],
			call: [
				'TT', '99', '88', '77', '66', '55', '44', '33', '22',
				'ATs', 'A9s', 'A8s', 'A7s', 'A6s',
				'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s',
				'QJs', 'QTs', 'Q9s', 'Q8s',
				'JTs', 'J9s', 'J8s',
				'T9s', 'T8s', 'T7s',
				'98s', '97s', '96s',
				'87s', '86s', '85s',
				'76s', '75s',
				'65s', '64s',
				'54s', '53s',
				'43s',
				'AJo', 'ATo', 'A9o',
				'KQo', 'KJo', 'KTo',
				'QJo', 'QTo',
				'JTo', 'J9o',
				'T9o',
				'98o'
			]
		},
		'fold'
	),

	// Facing BTN open — wide defense
	'SB:BTN': buildRange(
		{
			'3bet': [
				'AA', 'KK', 'QQ', 'JJ', 'TT',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s',
				'AKo', 'AQo', 'AJo',
				'A5s', 'A4s', 'A3s',
				'K9s',
				'76s', '65s'
			],
			call: ['99', '88', 'KQs', 'KJs', 'KTs', 'QJs']
		},
		'fold'
	),
	'BB:BTN': buildRange(
		{
			'3bet': [
				'AA', 'KK', 'QQ', 'JJ', 'TT',
				'AKs', 'AQs', 'AJs', 'ATs',
				'AKo', 'AQo',
				'A5s', 'A4s', 'A3s', 'A2s',
				'K5s', 'K4s',
				'76s', '65s', '54s'
			],
			call: [
				'99', '88', '77', '66', '55', '44', '33', '22',
				'A9s', 'A8s', 'A7s', 'A6s',
				'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s',
				'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
				'JTs', 'J9s', 'J8s', 'J7s',
				'T9s', 'T8s', 'T7s',
				'98s', '97s', '96s',
				'87s', '86s', '85s',
				'75s', '74s',
				'64s', '63s',
				'53s', '52s',
				'43s', '42s',
				'32s',
				'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o',
				'KQo', 'KJo', 'KTo', 'K9o',
				'QJo', 'QTo', 'Q9o',
				'JTo', 'J9o',
				'T9o', 'T8o',
				'98o', '97o',
				'87o',
				'76o'
			]
		},
		'fold'
	)
};

export default facingRaiseRanges;
