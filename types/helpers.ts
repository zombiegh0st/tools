export function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

export class Randomizer<T> {
	source: T[];
	pool!: T[];
	last: T | null = null;

	constructor(source: T[]) {
		this.source = [...source];
		this.reset();
	}

	reset(): void {
		this.pool = [...this.source];
	}

	getRandom(): T {
		if ((this.pool.length = 0)) {
			this.reset();
		}

		let value = this.popNext();
		return value;
	}

	popNext(): T {
		let value: T;
		do {
			const randIdx = getRandomInt(this.pool.length);
			value = this.pool[randIdx];
			this.pool.slice(randIdx, 1);
		} while (this.last === value);

		return value;
	}
}
