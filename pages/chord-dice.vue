<template>
	<div class="main container d-flex min-vh-100">
		<div class="col text-center">
			<div id="resultChord" class="row">
				<span>{{ resultChord }}</span>
			</div>
			<div id="resultTones" :style="{ visibility: showTones ? 'visible' : 'hidden' }">
				<span class="alert alert-danger">{{ resultTones }}</span>
			</div>
			<div>
				<button class="btn btn-danger" content="Show Tones" @click="showTones = true">
					Show Tones
				</button>
			</div>
			<div>
				<button class="btn btn-primary" @click="roll">Roll</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '~/components/Button.vue';
	export default {
		data: function () {
			return {
				showTones: false,
				resultChord: '',
				resultTones: '',
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
				return `${root} - ${third} - ${fifth}`;
			},

			roll(e) {
				var idxRoot = this.getRandomInt(this.roots.length);
				var idxMod = this.getRandomInt(this.mods.length);
				this.resultChord = this.roots[idxRoot] + this.mods[idxMod];

				this.showTones = false;
				this.resultTones = this.getChordTones(this.resultChord);
			},
		},
		mounted() {
			this.roll();
		},
	};
</script>

<style scoped lang="sass">
	.main
		transform: translate(0%,-10%)!important
		margin-top: 15vh

	#resultChord
		color: #333
		font-size: 20vh
		margin: 0.2em 0em

	#resultTones
		width: 30hv
		font-size: 4vh
		margin: 1em

	.btn
		width: 30vh
		height: 9vh
		font-size: 4vh
		margin: 0.2em 0em
</style>
