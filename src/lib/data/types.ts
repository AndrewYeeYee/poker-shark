// ---- Card primitives ----
export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type Rank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export interface Card {
	rank: Rank;
	suit: Suit;
}

// ---- 13x13 grid primitives ----
export type Suitedness = 'pair' | 'suited' | 'offsuit';

export interface HandCombo {
	label: string;
	rank1: Rank;
	rank2: Rank;
	suitedness: Suitedness;
	row: number;
	col: number;
}

// ---- Positions & Scenarios ----
export const POSITIONS = [
	'UTG',
	'UTG1',
	'UTG2',
	'MP',
	'MP1',
	'LJ',
	'HJ',
	'CO',
	'BTN',
	'SB',
	'BB'
] as const;
export type Position = (typeof POSITIONS)[number];

export type ScenarioType = 'rfi' | 'facing_raise' | 'facing_3bet' | 'squeeze';

export interface Scenario {
	type: ScenarioType;
	heroPosition: Position;
	villainPosition?: Position;
	callerPosition?: Position;
}

// ---- Actions ----
export type RfiAction = 'raise' | 'fold';
export type FacingRaiseAction = '3bet' | 'call' | 'fold';
export type Facing3BetAction = '4bet' | 'call' | 'fold';
export type SqueezeAction = 'squeeze' | 'call' | 'fold';
export type Action = 'raise' | '3bet' | '4bet' | 'squeeze' | 'call' | 'fold';

// ---- Ranges ----
export type Range = Record<string, Action>;
export type RangeSet = Record<string, Range>;

// ---- Stats ----
export interface SessionStats {
	total: number;
	correct: number;
	byScenarioType: Record<ScenarioType, { total: number; correct: number }>;
	byPosition: Partial<Record<Position, { total: number; correct: number }>>;
}

export interface HistoricalSession {
	date: string;
	total: number;
	correct: number;
	scenarioType: ScenarioType | 'mixed';
}

export interface PersistentStats {
	sessions: HistoricalSession[];
	lifetimeTotal: number;
	lifetimeCorrect: number;
	byScenarioKey: Record<string, { total: number; correct: number }>;
}

// ---- Quiz ----
export interface QuizQuestion {
	scenario: Scenario;
	scenarioKey: string;
	card1: Card;
	card2: Card;
	comboLabel: string;
	correctAction: Action;
}

export interface QuizFeedback {
	isCorrect: boolean;
	userAction: Action;
	correctAction: Action;
	comboLabel: string;
}

export interface QuizSettings {
	scenarioTypes: ScenarioType[];
	positions: Position[];
	useCustomRanges: boolean;
}
