<template>
	<div class="main container d-flex align-items-center min-vh-100">
		<div class="col text-center align-middle">
			<div class="row align-items-center">
				<span class="result">{{ roots[idxRoot] }} • {{ intervals[idxShape] }}</span>
			</div>
			<div>
				<Button class="roll-button" content="mix" :onClick="roll" />
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '~/components/Button.vue';
	export default {
		data: function () {
			return {
				idxRoot: 0,
				idxShape: 0,
				intervals: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
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
			};
		},

		components: {
			Button,
		},

		methods: {
			getRandomInt: function (max) {
				return Math.floor(Math.random() * max);
			},
			roll: function (e) {
				var newRoot = this.getRandomInt(this.roots.length);
				this.idxRoot = newRoot;

				var newShape = this.getRandomInt(this.intervals.length);
				this.idxShape = newShape;
			},
		},
	};
</script>

<style scoped lang="sass">
	.roll-button
		width: 30vh
		height: 9vh
		font-size: 4vh

	.result
		color: #333
		font-size: 6em
		margin: 1em 0em

	.main
		transform: translate(0%,-10%)!important
</style>
