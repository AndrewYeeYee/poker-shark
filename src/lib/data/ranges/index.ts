import type { Range, RangeSet, Scenario } from '../types';
import { scenarioKey } from '../scenarios';
import rfiRanges from './rfi';
import facingRaiseRanges from './facing-raise';
import facing3BetRanges from './facing-3bet';
import squeezeRanges from './squeeze';

// Build a unified default range set keyed by scenario key
function buildDefaultRanges(): RangeSet {
	const ranges: RangeSet = {};

	// RFI ranges
	for (const [position, range] of Object.entries(rfiRanges)) {
		ranges[`rfi:${position}`] = range;
	}

	// Facing raise ranges
	for (const [key, range] of Object.entries(facingRaiseRanges)) {
		ranges[`facing_raise:${key}`] = range;
	}

	// Facing 3-bet ranges
	for (const [key, range] of Object.entries(facing3BetRanges)) {
		ranges[`facing_3bet:${key}`] = range;
	}

	// Squeeze ranges
	for (const [key, range] of Object.entries(squeezeRanges)) {
		ranges[`squeeze:${key}`] = range;
	}

	return ranges;
}

export const defaultRanges: RangeSet = buildDefaultRanges();

export function getDefaultRange(key: string): Range | undefined {
	return defaultRanges[key];
}

export function getDefaultRangeForScenario(scenario: Scenario): Range | undefined {
	return defaultRanges[scenarioKey(scenario)];
}

export function hasDefaultRange(key: string): boolean {
	return key in defaultRanges;
}

/** Get all scenario keys that have default ranges */
export function allDefaultScenarioKeys(): string[] {
	return Object.keys(defaultRanges);
}
