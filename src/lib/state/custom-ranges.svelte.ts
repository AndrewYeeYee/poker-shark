import { loadFromStorage, saveToStorage } from '$lib/storage/local-storage';
import type { Range, RangeSet } from '$lib/data/types';

const STORAGE_KEY = 'poker-shark-custom-ranges';
const STORAGE_VERSION = 1;

let customRanges = $state<RangeSet>(loadFromStorage(STORAGE_KEY, STORAGE_VERSION, {}));

function save() {
	saveToStorage(STORAGE_KEY, STORAGE_VERSION, customRanges);
}

export function getCustomRange(key: string): Range | undefined {
	return customRanges[key];
}

export function setCustomRange(key: string, range: Range): void {
	customRanges[key] = range;
	save();
}

export function resetCustomRange(key: string): void {
	delete customRanges[key];
	save();
}

export function hasCustomRange(key: string): boolean {
	return key in customRanges;
}

export function getAllCustomRanges(): RangeSet {
	return customRanges;
}

export function importRanges(data: RangeSet): void {
	customRanges = { ...customRanges, ...data };
	save();
}

export function exportRanges(): string {
	return JSON.stringify(customRanges, null, 2);
}
