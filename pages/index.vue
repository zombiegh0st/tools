<template>
	<div class="main container d-flex align-items-center min-vh-100">
		<div class="col text-center align-middle">
			<div>
				<button class="btn btn-primary row button" @click="goto('/root-shape-dice')">
					RS-Dice
				</button>
			</div>
			<div>
				<button class="btn btn-primary row button" @click="goto('/chord-dice')">
					Chord-Dice
				</button>
			</div>
			<div>
				<button class="btn btn-primary row button" @click="goto('/bennys-cards')">
					Bennys Cards
				</button>
			</div>
			<!-- <div>
				<button class="btn btn-primary row button" @click="goto('/youtube-looper')">
					Looper
				</button>
			</div> -->
		</div>
	</div>
</template>

<script>
	import Button from '~/components/Button.vue';
	export default {
		components: {
			Button,
		},

		methods: {
			goto: function (url) {
				this.$router.push(url);
			},
		},
	};
</script>

<style scoped lang="sass">
	.button
		width: 30vh
		height: 9vh
		font-size: 4vh
		margin: 1em 0em

	.main
		transform: translate(0%,-10%)!important
</style>
