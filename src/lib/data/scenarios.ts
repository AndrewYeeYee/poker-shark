import { POSITIONS, type Action, type Position, type Scenario, type ScenarioType } from './types';

const POSITION_ORDER = POSITIONS.reduce(
	(acc, pos, idx) => {
		acc[pos] = idx;
		return acc;
	},
	{} as Record<Position, number>
);

export function scenarioKey(s: Scenario): string {
	switch (s.type) {
		case 'rfi':
			return `rfi:${s.heroPosition}`;
		case 'facing_raise':
			return `facing_raise:${s.heroPosition}:${s.villainPosition}`;
		case 'facing_3bet':
			return `facing_3bet:${s.heroPosition}:${s.villainPosition}`;
		case 'squeeze':
			return `squeeze:${s.heroPosition}:${s.villainPosition}:${s.callerPosition}`;
	}
}

export function actionsForScenarioType(type: ScenarioType): Action[] {
	switch (type) {
		case 'rfi':
			return ['raise', 'fold'];
		case 'facing_raise':
			return ['3bet', 'call', 'fold'];
		case 'facing_3bet':
			return ['4bet', 'call', 'fold'];
		case 'squeeze':
			return ['squeeze', 'call', 'fold'];
	}
}

export function describeScenario(s: Scenario): string {
	switch (s.type) {
		case 'rfi':
			return `You are on the ${s.heroPosition}. Action folds to you.`;
		case 'facing_raise':
			return `You are on the ${s.heroPosition}. ${s.villainPosition} raised.`;
		case 'facing_3bet':
			return `You opened from ${s.heroPosition}. ${s.villainPosition} 3-bet.`;
		case 'squeeze':
			return `You are on the ${s.heroPosition}. ${s.villainPosition} raised, ${s.callerPosition} called.`;
	}
}

/** Check if hero is later in position than villain (higher index = later) */
function isLaterPosition(hero: Position, villain: Position): boolean {
	return POSITION_ORDER[hero] > POSITION_ORDER[villain];
}

function pickRandom<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

/** Get all valid RFI positions (everyone except BB — can't RFI from BB) */
function rfiPositions(): Position[] {
	return POSITIONS.filter((p) => p !== 'BB');
}

/** Generate a random valid scenario matching the given type */
function generateForType(type: ScenarioType): Scenario {
	switch (type) {
		case 'rfi': {
			return { type, heroPosition: pickRandom(rfiPositions()) };
		}
		case 'facing_raise': {
			// Villain opened, hero acts after (or hero is in blinds)
			const validPairs: [Position, Position][] = [];
			for (const villain of POSITIONS) {
				if (villain === 'SB' || villain === 'BB') continue; // blinds don't "open raise" in normal sense for this
				for (const hero of POSITIONS) {
					if (hero === villain) continue;
					// Hero acts after villain, or hero is in the blinds
					if (isLaterPosition(hero, villain) || hero === 'SB' || hero === 'BB') {
						validPairs.push([hero, villain]);
					}
				}
			}
			const [hero, villain] = pickRandom(validPairs);
			return { type, heroPosition: hero, villainPosition: villain };
		}
		case 'facing_3bet': {
			// Hero opened, villain 3-bet from a later position (or blinds)
			const validPairs: [Position, Position][] = [];
			for (const hero of POSITIONS) {
				if (hero === 'BB') continue; // BB doesn't open
				for (const villain of POSITIONS) {
					if (villain === hero) continue;
					if (isLaterPosition(villain, hero) || villain === 'SB' || villain === 'BB') {
						validPairs.push([hero, villain]);
					}
				}
			}
			const [hero, villain] = pickRandom(validPairs);
			return { type, heroPosition: hero, villainPosition: villain };
		}
		case 'squeeze': {
			// Villain opened, caller called, hero is behind all of them
			const validTriples: [Position, Position, Position][] = [];
			for (const villain of POSITIONS) {
				if (villain === 'SB' || villain === 'BB') continue;
				for (const caller of POSITIONS) {
					if (caller === villain || caller === 'SB' || caller === 'BB') continue;
					if (!isLaterPosition(caller, villain)) continue;
					for (const hero of POSITIONS) {
						if (hero === villain || hero === caller) continue;
						if (
							isLaterPosition(hero, caller) ||
							hero === 'SB' ||
							hero === 'BB'
						) {
							validTriples.push([hero, villain, caller]);
						}
					}
				}
			}
			const [hero, villain, caller] = pickRandom(validTriples);
			return {
				type,
				heroPosition: hero,
				villainPosition: villain,
				callerPosition: caller
			};
		}
	}
}

export interface QuizSettingsFilter {
	scenarioTypes: ScenarioType[];
	positions: Position[];
}

export function generateScenario(filter: QuizSettingsFilter): Scenario {
	const type = pickRandom(filter.scenarioTypes);
	// Keep generating until hero position matches filter
	for (let i = 0; i < 100; i++) {
		const scenario = generateForType(type);
		if (filter.positions.includes(scenario.heroPosition)) {
			return scenario;
		}
	}
	// Fallback
	return generateForType(type);
}
