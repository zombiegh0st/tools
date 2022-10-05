import { getRandomInt } from '@/types/helpers';

export const AMOUNT_BASE_INTERVALLS = 7;
export const AMOUNT_INTERVALLS = 12;

export class Sign {
	readonly value: number;
	readonly name: string;

	static readonly sharp = new Sign(1, '#');
	static readonly flat = new Sign(-1, 'b');
	static readonly none = new Sign(0, '');
	static readonly pool = [Sign.sharp, Sign.flat, Sign.none];

	private constructor(value: number, name: string) {
		this.value = value;
		this.name = name;
	}

	static getRandom(): Sign {
		const rand = getRandomInt(Sign.pool.length);
		return Sign.pool[rand];
	}

	toString(): string {
		return this.name;
	}
}

export class Interval {
	baseValue: number;
	absoluteValue: number;

	static PerfectUnison = new Interval(0, 0);
	static AugmentedUnison = new Interval(0, 1);
	static DiminishedSecond = new Interval(1, 0);
	static MinorSecond = new Interval(1, 1);
	static MajorSecond = new Interval(1, 2);
	static AugmentedSecond = new Interval(1, 3);
	static DiminishedThird = new Interval(2, 2);
	static MinorThird = new Interval(2, 3);
	static MajorThird = new Interval(2, 4);
	static AugmentedThird = new Interval(2, 5);
	static DiminishedFourth = new Interval(3, 4);
	static PerfectFourth = new Interval(3, 5);
	static AugmenteFourth = new Interval(3, 6);
	static DiminishedFifth = new Interval(4, 6);
	static PerfectFifth = new Interval(4, 7);
	static AugmentedFifth = new Interval(4, 8);
	static DiminishedSixth = new Interval(5, 7);
	static MinorSixth = new Interval(5, 8);
	static MajorSixth = new Interval(5, 9);
	static AugmentedSixth = new Interval(5, 10);
	static DiminishedSeventh = new Interval(6, 9);
	static MinorSeventh = new Interval(6, 10);
	static MajorSeventh = new Interval(6, 11);
	static AugmentedSeventh = new Interval(6, 12);
	static DiminishedOctave = new Interval(7, 11);
	static PerfectOctave = new Interval(7, 12);

	constructor(baseValue: number, absoluteValue: number) {
		this.baseValue = baseValue;
		this.absoluteValue = absoluteValue;
	}
}

export class Base {
	readonly baseOffset: number;
	readonly absoluteValue: number;
	readonly name: string;

	static readonly C = new Base(0, 0, 'C');
	static readonly D = new Base(1, 2, 'D');
	static readonly E = new Base(2, 4, 'E');
	static readonly F = new Base(3, 5, 'F');
	static readonly G = new Base(4, 7, 'G');
	static readonly A = new Base(5, 9, 'A');
	static readonly B = new Base(6, 11, 'B');

	public static readonly pool: Base[] = [Base.C, Base.D, Base.E, Base.F, Base.G, Base.A, Base.B];

	private constructor(baseOffset: number, absoluteOffset: number, name: string) {
		this.baseOffset = baseOffset % AMOUNT_BASE_INTERVALLS;
		this.absoluteValue = absoluteOffset % AMOUNT_INTERVALLS;
		this.name = name;
	}

	getShiftedValue(interval: number): Base {
		const idxOfThis = Base.pool.indexOf(this);
		const idxOfIntervall = (idxOfThis + interval) % AMOUNT_BASE_INTERVALLS;
		return Base.pool[idxOfIntervall];
	}

	static getRandom(): Base {
		const rand = getRandomInt(Base.pool.length);
		return Base.pool[rand];
	}

	toString(): string {
		return Base.pool[this.baseOffset].name;
	}
}

export class Tone {
	readonly signs: Sign[];
	readonly base: Base;

	static readonly C = new Tone(Base.C, Sign.none);
	static readonly 'C#' = new Tone(Base.C, Sign.sharp);
	static readonly Db = new Tone(Base.D, Sign.flat);
	static readonly D = new Tone(Base.D);
	static readonly 'D#' = new Tone(Base.D, Sign.sharp);
	static readonly Eb = new Tone(Base.E, Sign.flat);
	static readonly E = new Tone(Base.E);
	static readonly F = new Tone(Base.F);
	static readonly 'F#' = new Tone(Base.F, Sign.sharp);
	static readonly Gb = new Tone(Base.G, Sign.flat);
	static readonly G = new Tone(Base.G);
	static readonly 'G#' = new Tone(Base.G, Sign.sharp);
	static readonly A = new Tone(Base.A);
	static readonly Ab = new Tone(Base.A, Sign.flat);
	static readonly 'A#' = new Tone(Base.A, Sign.sharp);
	static readonly Bb = new Tone(Base.B, Sign.flat);
	static readonly B = new Tone(Base.B);

	static readonly pool = [
		Tone.C,
		Tone['C#'],
		Tone.Db,
		Tone.D,
		Tone['D#'],
		Tone.Eb,
		Tone.E,
		Tone.F,
		Tone['F#'],
		Tone.Gb,
		Tone.G,
		Tone['G#'],
		Tone.A,
		Tone.Ab,
		Tone['A#'],
		Tone.Bb,
		Tone.B,
	];

	constructor(base: Base, ...signs: Sign[]) {
		this.signs = signs;
		this.base = base;
	}

	getInterval(interval: Interval): Tone {
		const baseIntervall = this.base.getShiftedValue(interval.baseValue);
		const targetValue = interval.absoluteValue;
		const signShift = this.getSignValuesSum();

		// differenz zwischen den werten finden (in einem kreis aus 12 werten)
		let difference = baseIntervall.absoluteValue + AMOUNT_INTERVALLS;
		difference -= this.base.absoluteValue;
		difference %= AMOUNT_INTERVALLS;
		difference += signShift * -1;

		// lücke mit vorzeichen ausgleichen
		const missingSings = targetValue - difference;
		const signs =
			missingSings > 0
				? Array(Math.abs(missingSings)).fill(Sign.sharp)
				: Array(Math.abs(missingSings)).fill(Sign.flat);

		return new Tone(baseIntervall, ...signs);
	}

	static getRandom(): Tone {
		return new Tone(Base.getRandom(), Sign.getRandom());
	}

	getSignValuesSum(): number {
		// summe aus den vorzeichen-werten
		return this.signs.reduce((sum, sign) => (sum += sign.value), 0);
	}

	toString(): string {
		return this.base.toString() + this.signs.join('');
	}
}
