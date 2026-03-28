import { loadFromStorage, saveToStorage } from '$lib/storage/local-storage';
import type { PersistentStats, Position, ScenarioType, SessionStats } from '$lib/data/types';

const STORAGE_KEY = 'poker-shark-stats';
const STORAGE_VERSION = 1;

function emptySession(): SessionStats {
	return {
		total: 0,
		correct: 0,
		byScenarioType: {
			rfi: { total: 0, correct: 0 },
			facing_raise: { total: 0, correct: 0 },
			facing_3bet: { total: 0, correct: 0 },
			squeeze: { total: 0, correct: 0 }
		},
		byPosition: {}
	};
}

function emptyPersistent(): PersistentStats {
	return {
		sessions: [],
		lifetimeTotal: 0,
		lifetimeCorrect: 0,
		byScenarioKey: {}
	};
}

let session = $state<SessionStats>(emptySession());
let persistent = $state<PersistentStats>(
	loadFromStorage(STORAGE_KEY, STORAGE_VERSION, emptyPersistent())
);

function savePersistent() {
	saveToStorage(STORAGE_KEY, STORAGE_VERSION, persistent);
}

export function recordAnswer(
	scenarioKey: string,
	position: Position,
	scenarioType: ScenarioType,
	correct: boolean
): void {
	session.total++;
	if (correct) session.correct++;

	const st = session.byScenarioType[scenarioType];
	st.total++;
	if (correct) st.correct++;

	if (!session.byPosition[position]) {
		session.byPosition[position] = { total: 0, correct: 0 };
	}
	session.byPosition[position]!.total++;
	if (correct) session.byPosition[position]!.correct++;

	persistent.lifetimeTotal++;
	if (correct) persistent.lifetimeCorrect++;

	if (!persistent.byScenarioKey[scenarioKey]) {
		persistent.byScenarioKey[scenarioKey] = { total: 0, correct: 0 };
	}
	persistent.byScenarioKey[scenarioKey].total++;
	if (correct) persistent.byScenarioKey[scenarioKey].correct++;

	savePersistent();
}

export function endSession(): void {
	if (session.total === 0) return;

	let dominantType: ScenarioType | 'mixed' = 'mixed';
	const types = Object.entries(session.byScenarioType).filter(([, v]) => v.total > 0);
	if (types.length === 1) {
		dominantType = types[0][0] as ScenarioType;
	}

	persistent.sessions.push({
		date: new Date().toISOString(),
		total: session.total,
		correct: session.correct,
		scenarioType: dominantType
	});

	savePersistent();
	session = emptySession();
}

export function resetSession(): void {
	session = emptySession();
}

export function resetAllStats(): void {
	persistent = emptyPersistent();
	session = emptySession();
	savePersistent();
}

export function getSession(): SessionStats {
	return session;
}

export function getPersistent(): PersistentStats {
	return persistent;
}
