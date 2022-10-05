import { Interval, Tone, AMOUNT_INTERVALLS } from './tone';
import { Chord, Mod } from './chord';
import { getRandomInt } from '../helpers';
export class CircleOfFifths {
	static getMajorFifth(atPosition: number): Chord {
		return CircleOfFifths.getIntervalOf(Tone.C, atPosition, Interval.PerfectFifth, Mod.Major);
	}

	static getMajorFourth(atPosition: number): Chord {
		return CircleOfFifths.getIntervalOf(Tone.C, atPosition, Interval.PerfectFourth, Mod.Major);
	}

	static getMinorFifth(atPosition: number): Chord {
		return CircleOfFifths.getIntervalOf(Tone.A, atPosition, Interval.PerfectFifth, Mod.Minor);
	}

	static getMinorFourth(atPosition: number): Chord {
		return CircleOfFifths.getIntervalOf(Tone.A, atPosition, Interval.PerfectFourth, Mod.Minor);
	}

	static getIntervalOf(
		ofTone: Tone,
		atPosition: number,
		throughInterval: Interval,
		asMod: Mod,
	): Chord {
		let base = ofTone;
		for (let i = 0; i < atPosition; i++) {
			base = base.getInterval(throughInterval);
		}
		const chord = new Chord(base, asMod);
		return chord;
	}

	static *getDefaultMajorSet() {
		const half = AMOUNT_INTERVALLS / 2;
		for (let i = 0; i <= half; i++) {
			yield this.getMajorFifth(i);
		}

		for (let i = half; i > 0; i--) {
			yield this.getMajorFourth(i);
		}
	}

	static *getDefaultMinorSet() {
		const half = AMOUNT_INTERVALLS / 2;
		for (let i = 0; i <= half; i++) {
			yield this.getMinorFifth(i);
		}

		for (let i = half; i > 0; i--) {
			yield this.getMinorFourth(i);
		}
	}

	static getRandomChord(): Chord {
		const pool = [...this.getDefaultMajorSet(), ...this.getDefaultMinorSet()];
		const rand = getRandomInt(pool.length);
		return pool[rand];
	}
}
