import { buildRange } from '../combos';
import type { Position, Range } from '../types';

// GTO-approximation RFI (Raise First In) ranges for 9-max
// Tighter from early position, wider from late position

const rfiRanges: Partial<Record<Position, Range>> = {
	UTG: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99',
				'AKs', 'AQs', 'AJs', 'ATs',
				'KQs', 'KJs',
				'QJs',
				'AKo', 'AQo'
			]
		},
		'fold'
	),
	UTG1: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s',
				'KQs', 'KJs', 'KTs',
				'QJs', 'QTs',
				'JTs',
				'AKo', 'AQo', 'AJo'
			]
		},
		'fold'
	),
	UTG2: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s',
				'KQs', 'KJs', 'KTs',
				'QJs', 'QTs',
				'JTs', 'J9s',
				'T9s',
				'AKo', 'AQo', 'AJo'
			]
		},
		'fold'
	),
	MP: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A5s',
				'KQs', 'KJs', 'KTs', 'K9s',
				'QJs', 'QTs', 'Q9s',
				'JTs', 'J9s',
				'T9s', 'T8s',
				'98s',
				'AKo', 'AQo', 'AJo', 'ATo'
			]
		},
		'fold'
	),
	MP1: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s',
				'KQs', 'KJs', 'KTs', 'K9s',
				'QJs', 'QTs', 'Q9s',
				'JTs', 'J9s',
				'T9s', 'T8s',
				'98s', '97s',
				'87s',
				'76s',
				'AKo', 'AQo', 'AJo', 'ATo'
			]
		},
		'fold'
	),
	LJ: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s',
				'KQs', 'KJs', 'KTs', 'K9s', 'K8s',
				'QJs', 'QTs', 'Q9s',
				'JTs', 'J9s', 'J8s',
				'T9s', 'T8s',
				'98s', '97s',
				'87s', '86s',
				'76s', '75s',
				'65s',
				'AKo', 'AQo', 'AJo', 'ATo', 'KQo'
			]
		},
		'fold'
	),
	HJ: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
				'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s',
				'QJs', 'QTs', 'Q9s', 'Q8s',
				'JTs', 'J9s', 'J8s',
				'T9s', 'T8s', 'T7s',
				'98s', '97s',
				'87s', '86s',
				'76s', '75s',
				'65s', '64s',
				'54s',
				'AKo', 'AQo', 'AJo', 'ATo', 'KQo', 'KJo'
			]
		},
		'fold'
	),
	CO: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
				'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
				'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s',
				'JTs', 'J9s', 'J8s', 'J7s',
				'T9s', 'T8s', 'T7s',
				'98s', '97s', '96s',
				'87s', '86s',
				'76s', '75s',
				'65s', '64s',
				'54s', '53s',
				'43s',
				'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
				'KQo', 'KJo', 'KTo',
				'QJo', 'QTo',
				'JTo'
			]
		},
		'fold'
	),
	BTN: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
				'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
				'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s',
				'JTs', 'J9s', 'J8s', 'J7s', 'J6s',
				'T9s', 'T8s', 'T7s', 'T6s',
				'98s', '97s', '96s',
				'87s', '86s', '85s',
				'76s', '75s',
				'65s', '64s',
				'54s', '53s',
				'43s',
				'32s',
				'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o',
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
	),
	SB: buildRange(
		{
			raise: [
				'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
				'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
				'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s',
				'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
				'JTs', 'J9s', 'J8s', 'J7s',
				'T9s', 'T8s', 'T7s',
				'98s', '97s', '96s',
				'87s', '86s',
				'76s', '75s',
				'65s', '64s',
				'54s', '53s',
				'43s',
				'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A5o',
				'KQo', 'KJo', 'KTo',
				'QJo', 'QTo',
				'JTo', 'J9o',
				'T9o',
				'98o'
			]
		},
		'fold'
	)
};

export default rfiRanges;
