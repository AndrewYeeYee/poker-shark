import { loadFromStorage, saveToStorage } from '$lib/storage/local-storage';
import { POSITIONS, type QuizSettings } from '$lib/data/types';

const STORAGE_KEY = 'poker-shark-settings';
const STORAGE_VERSION = 1;

const defaultSettings: QuizSettings = {
	scenarioTypes: ['rfi'],
	positions: [...POSITIONS],
	useCustomRanges: false
};

let settings = $state<QuizSettings>(loadFromStorage(STORAGE_KEY, STORAGE_VERSION, defaultSettings));

function save() {
	saveToStorage(STORAGE_KEY, STORAGE_VERSION, settings);
}

export function getSettings(): QuizSettings {
	return settings;
}

export function updateSettings(partial: Partial<QuizSettings>): void {
	settings = { ...settings, ...partial };
	save();
}
