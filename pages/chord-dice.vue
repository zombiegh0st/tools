<template>
	<div class="main" @wheel.prevent @touchmove.prevent @scroll.prevent>
		<div class="container d-flex">
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
					<button class="btn btn-primary" @click="mix">Roll</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Button from '~/components/Button.vue';
	import { Chord } from '~/types/music/chord';
	import { CircleOfFifths } from '~/types/music/circle-of-fifths';
	export default {
		data: function () {
			return {
				showTones: false,
				resultChord: '',
				resultTones: '',
			};
		},

		components: {
			Button,
		},

		methods: {
			roll(e) {
				this.showTones = false;
				const chord = CircleOfFifths.getRandomChord();
				this.resultChord = chord.toString();
				this.resultTones = chord.getTones().join(', ');
			},
		},
		mounted() {
			this.roll();
		},
	};
</script>

<style scoped lang="sass">
	.main
		heigth: 100%
		width: 100%

	.container
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
