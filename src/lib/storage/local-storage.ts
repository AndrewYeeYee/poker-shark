interface StoredData<T> {
	version: number;
	data: T;
}

export function loadFromStorage<T>(key: string, version: number, fallback: T): T {
	if (typeof window === 'undefined') return fallback;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		const stored: StoredData<T> = JSON.parse(raw);
		if (stored.version !== version) return fallback;
		return stored.data;
	} catch {
		return fallback;
	}
}

export function saveToStorage<T>(key: string, version: number, data: T): void {
	if (typeof window === 'undefined') return;
	try {
		const stored: StoredData<T> = { version, data };
		localStorage.setItem(key, JSON.stringify(stored));
	} catch {
		// localStorage full or unavailable
	}
}

export function removeFromStorage(key: string): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(key);
}
