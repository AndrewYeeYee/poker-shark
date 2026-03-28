import { RANKS, RANK_INDEX } from './constants';
import type { Action, Card, HandCombo, Rank, Range, Suitedness } from './types';

function suitednessFor(row: number, col: number): Suitedness {
	if (row === col) return 'pair';
	if (row < col) return 'suited';
	return 'offsuit';
}

function comboLabel(row: number, col: number): string {
	const r1 = RANKS[row];
	const r2 = RANKS[col];
	const suitedness = suitednessFor(row, col);
	if (suitedness === 'pair') return `${r1}${r2}`;
	if (suitedness === 'suited') return `${r1}${r2}s`;
	// offsuit: higher rank first
	return `${r2}${r1}o`;
}

function buildGrid(): HandCombo[][] {
	const grid: HandCombo[][] = [];
	for (let row = 0; row < 13; row++) {
		const rowArr: HandCombo[] = [];
		for (let col = 0; col < 13; col++) {
			const suitedness = suitednessFor(row, col);
			const label = comboLabel(row, col);
			// rank1 is always the higher rank in the label
			const rank1 = suitedness === 'offsuit' ? RANKS[col] : RANKS[row];
			const rank2 = suitedness === 'offsuit' ? RANKS[row] : RANKS[col];
			rowArr.push({ label, rank1, rank2, suitedness, row, col });
		}
		grid.push(rowArr);
	}
	return grid;
}

export const GRID: HandCombo[][] = buildGrid();
export const ALL_COMBOS: HandCombo[] = GRID.flat();

export function comboLabelFromCards(c1: Card, c2: Card): string {
	const idx1 = RANK_INDEX[c1.rank];
	const idx2 = RANK_INDEX[c2.rank];
	const sameSuit = c1.suit === c2.suit;

	// Higher rank (lower index) first
	let highRank: Rank, lowRank: Rank;
	if (idx1 <= idx2) {
		highRank = c1.rank;
		lowRank = c2.rank;
	} else {
		highRank = c2.rank;
		lowRank = c1.rank;
	}

	if (highRank === lowRank) return `${highRank}${lowRank}`;
	return sameSuit ? `${highRank}${lowRank}s` : `${highRank}${lowRank}o`;
}

/**
 * Build a range by specifying which combos get each action.
 * Any combo not listed defaults to `defaultAction`.
 */
export function buildRange(
	actionCombos: Partial<Record<Action, string[]>>,
	defaultAction: Action
): Range {
	const range: Range = {};
	for (const combo of ALL_COMBOS) {
		range[combo.label] = defaultAction;
	}
	for (const [action, combos] of Object.entries(actionCombos)) {
		for (const label of combos!) {
			range[label] = action as Action;
		}
	}
	return range;
}
