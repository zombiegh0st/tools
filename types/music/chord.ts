import { Interval, Tone } from './tone';
import { getRandomInt } from '@/types/helpers';

export class Chord {
	root: Tone;
	mod: Mod;
	constructor(root: Tone, mod: Mod) {
		this.root = root;
		this.mod = mod;
	}

	getTones(): Tone[] {
		return this.mod.intervals.map((i) => this.root.getInterval(i));
	}

	static getRandom(): Chord {
		return new Chord(Tone.getRandom(), Mod.getRandom());
	}

	toString(): string {
		return this.root.toString() + this.mod.toString();
	}
}

export class Mod {
	suffix: string;
	intervals: Interval[];

	static Major = new Mod('', Interval.PerfectUnison, Interval.MajorThird, Interval.PerfectFifth);
	static Minor = new Mod('m', Interval.PerfectUnison, Interval.MinorThird, Interval.PerfectFifth);

	static readonly pool = [Mod.Major, Mod.Minor];

	constructor(suffix: string, ...intervals: Interval[]) {
		this.suffix = suffix;
		this.intervals = intervals;
	}

	static getRandom(): Mod {
		const rand = getRandomInt(Mod.pool.length);
		return Mod.pool[rand];
	}

	toString(): string {
		return this.suffix;
	}
}
