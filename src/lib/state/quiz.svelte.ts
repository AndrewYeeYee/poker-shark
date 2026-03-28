import { comboLabelFromCards } from '$lib/data/combos';
import { dealTwo } from '$lib/data/deck';
import { getDefaultRange } from '$lib/data/ranges';
import { actionsForScenarioType, generateScenario, scenarioKey } from '$lib/data/scenarios';
import type { Action, QuizFeedback, QuizQuestion } from '$lib/data/types';
import { getCustomRange } from './custom-ranges.svelte';
import { getSettings } from './settings.svelte';
import { recordAnswer } from './stats.svelte';

let currentQuestion = $state<QuizQuestion | null>(null);
let feedback = $state<QuizFeedback | null>(null);

function getRangeForKey(key: string): Record<string, Action> | undefined {
	const settings = getSettings();
	if (settings.useCustomRanges) {
		const custom = getCustomRange(key);
		if (custom) return custom;
	}
	return getDefaultRange(key);
}

export function nextQuestion(): void {
	feedback = null;
	const settings = getSettings();

	// Try to generate a valid question (one with a known range)
	for (let i = 0; i < 50; i++) {
		const scenario = generateScenario(settings);
		const key = scenarioKey(scenario);
		const range = getRangeForKey(key);
		if (!range) continue;

		const [card1, card2] = dealTwo();
		const comboLabel = comboLabelFromCards(card1, card2);
		const correctAction = range[comboLabel];
		if (!correctAction) continue;

		currentQuestion = { scenario, scenarioKey: key, card1, card2, comboLabel, correctAction };
		return;
	}

	// Fallback: couldn't find a valid scenario with the current settings
	currentQuestion = null;
}

export function submitAnswer(action: Action): void {
	if (!currentQuestion || feedback) return;

	const isCorrect = action === currentQuestion.correctAction;
	feedback = {
		isCorrect,
		userAction: action,
		correctAction: currentQuestion.correctAction,
		comboLabel: currentQuestion.comboLabel
	};

	recordAnswer(
		currentQuestion.scenarioKey,
		currentQuestion.scenario.heroPosition,
		currentQuestion.scenario.type,
		isCorrect
	);
}

export function getCurrentQuestion(): QuizQuestion | null {
	return currentQuestion;
}

export function getFeedback(): QuizFeedback | null {
	return feedback;
}

export function getAvailableActions(): Action[] {
	if (!currentQuestion) return [];
	return actionsForScenarioType(currentQuestion.scenario.type);
}
