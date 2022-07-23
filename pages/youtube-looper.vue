<template lang="pug">
	.main.container
		.col
			.search.row
				h1 Video
				.input-group.mb-3
					span.input-group-text id
					input.form-control(type="text" placeholder="VideoId" v-model="videoId")
					button.btn.btn-secondary
						.bi.bi-search

			.player
				youtube(:video-id="videoId" ref="youtube" @playing="playing" width="" height="")
			h1 {{isPlaying}}
			.controls
				.contorls-create
					h1 Start Loop
					.btn.btn-primary(@click="setstartLoopPosition")
						.bi.bi-align-start
					.btn.btn-primary
						.bi.bi-play-btn-fill
					.btn.btn-primary(@click="pauseVideo")
						.bi(:class="[isPlaying ? 'bi-pause' : 'bi-play-btn-fill']")
					.btn(:class="[isRepeating ? 'btn-primary' : 'btn-secondary']" v-on="isRepeating ? {click: stopLoop} : {click: startLoop}")
						.bi.bi-repeat
					.btn.btn-primary(@click="setendLoopPosition")
						.bi.bi-align-end

				.controls-adjust-start
					h1 Adjust Loop Start {{startLoopPosition}}
					.btn.btn-success
						.bi.bi-chevron-double-left
					.btn.btn-success
						.bi.bi-chevron-left
					.btn.btn-success
						.bi.bi-chevron-compact-left

					.btn.btn-success
						.bi.bi-chevron-compact-right
					.btn.btn-success
						.bi.bi-chevron-right
					.btn.btn-success
						.bi.bi-chevron-double-right

				.controls-adjust-start
					h1 Adjust Loop End {{endLoopPosition}}
					.btn.btn-danger
						.bi.bi-chevron-double-left
					.btn.btn-danger
						.bi.bi-chevron-left
					.btn.btn-danger
						.bi.bi-chevron-compact-left

					.btn.btn-danger
						.bi.bi-chevron-compact-right
					.btn.btn-danger
						.bi.bi-chevron-right
					.btn.btn-danger
						.bi.bi-chevron-double-right
</template>

<script>
	export default {
		data() {
			return {
				videoId: '3dKgqsGVPXQ',
				startLoopPosition: 0,
				endLoopPosition: 0,
				isRepeating: false,
			};
		},
		methods: {
			playVideo() {
				this.player.playVideo();
			},
			pauseVideo() {
				this.player.pauseVideo();
			},
			playing() {
				if (this.isRepeating) {
					this.runLoop();
				}
			},
			async setstartLoopPosition() {
				this.startLoopPosition = await this.player.getCurrentTime();
			},
			async setendLoopPosition() {
				this.endLoopPosition = await this.player.getCurrentTime();
			},
			loopIsValid() {
				return this.endLoopPosition > this.startLoopPosition;
			},
			runLoop() {
				setTimeout(this.startLoop, (this.endLoopPosition - this.startLoopPosition) * 1000);
			},
			async startLoop() {
				console.log('start');

				if (this.loopIsValid()) {
					this.isRepeating = true;
					const p = this.player;
					await p.seekTo(this.startLoopPosition);
				}
			},
			stopLoop() {
				console.log('stop');
				this.player.stopVideo();
				this.isRepeating = false;
				return;
			},
		},
		computed: {
			player() {
				return this.$refs.youtube.player;
			},
		},
		asyncComputed: {
			async isPlaying() {
				return (await this.player.getPlayerState()) === 1;
			},
		},
	};
</script>

<style scoped lang="sass">
	.main
		width: 100%
		height: 100%
		padding: 1em

	.player
		iframe
			width: -webkit-fill-available
			height: 100%

	.bi
		height: 100%
		width: 100%

	.controls
		.btn
			font-size: 1.5em
			padding: 0.2em 0.5em
			margin: 0.2em 0.1em
</style>
