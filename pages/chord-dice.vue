<template>
	<div class="main container d-flex align-items-center min-vh-100">
		<div class="col text-center align-middle">
			<div class="row align-items-center">
				<span class="resultChord">{{ resultChord }}</span>
			</div>
			<div class="row align-items-center">
				<span class="resultTones">{{ resultTones }}</span>
			</div>
			<div>
				<Button class="roll-button" content="Roll" :onClick="roll" />
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '~/components/Button.vue';
	export default {
		data: function () {
			return {
				resultChord: '',
				resultTones: '',
				//idxRoot: 0,
				//idxMod: 0,
				mods: ['', 'm'],
				roots: [
					'C',
					'C#',
					'Db',
					'D',
					'D#',
					'Eb',
					'E',
					'F',
					'F#',
					'Gb',
					'G',
					'G#',
					'A',
					'Ab',
					'A#',
					'Bb',
					'B',
				],
				tones_sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
				tones_flat: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
			};
		},

		components: {
			Button,
		},

		methods: {
			getRandomInt(max) {
				return Math.floor(Math.random() * max);
			},

			isFlat(chord) {
				return chord.slice(-1) === 'b' || chord.slice(-2) === 'bm';
			},

			isMinor(chord) {
				return chord.slice(-1) === 'm';
			},

			getChordTones(chord) {
				const tones = this.isFlat(chord) ? this.tones_flat : this.tones_sharp;
				const root = this.isMinor(chord) ? chord.slice(0, -1) : chord;
				const rootIdx = tones.indexOf(root);
				const thirdInterval = this.isMinor(chord) ? 3 : 4;
				const thirdIdx = (rootIdx + thirdInterval) % tones.length;
				const fifthInterval = 7;
				const fifthIdx = (rootIdx + fifthInterval) % tones.length;
				const third = tones[thirdIdx];
				const fifth = tones[fifthIdx];
				return `${root}, ${third}, ${fifth}`;
			},

			roll(e) {
				var idxRoot = this.getRandomInt(this.roots.length);
				var idxMod = this.getRandomInt(this.mods.length);
				this.resultChord = this.roots[idxRoot] + this.mods[idxMod];
				this.resultTones = this.getChordTones(this.resultChord);
			},
		},
	};
</script>

<style scoped lang="sass">
	.roll-button
		width: 30vh
		height: 9vh
		font-size: 4vh

	.resultChord
		color: #333
		font-size: 6em
		margin: 1em 0em

	.main
		transform: translate(0%,-10%)!important
</style>
