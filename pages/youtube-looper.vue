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
				youtube(:video-id="videoId" ref="youtube" width="" height="")
			.controls
				.contorls-create
					h1 Start Loop
					.btn.btn-primary(@click="setStartLoopPosition")
						.bi.bi-align-start
					.btn.btn-primary(@click="player.stopVideo()")
						.bi.bi-stop-fill
					.btn.btn-primary(@click="togglePlayVideo")
						.bi(:class="[isPlaying ? 'bi-pause' : 'bi-play-btn-fill']")
					.btn(:class="[isRepeating ? 'btn-primary' : 'btn-secondary']" v-on="isRepeating ? {click: stopLoop} : {click: runLoop}")
						.bi.bi-repeat
					.btn.btn-primary(@click="setEndLoopPosition")
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
				timerId: 0,
				isPlaying: false,
				currPosition: 0,
			};
		},
		methods: {
			async togglePlayVideo() {
				const p = this.player;
				if ((await p.getPlayerState()) === 1) {
					p.pauseVideo();
					this.isPlaying = false;
				} else {
					p.playVideo();
				}
			},

			async onStateChange(youtubeState) {
				if (youtubeState.data === this.playerState.PLAYING) {
					if (this.isRepeating) {
						this.runLoop();
					}
				} else {
					clearTimeout(this.timerId);
				}
				this.currPosition = await this.player.getCurrentTime();
				this.isPlaying = this.isRepeating && youtubeState.data === this.playerState.PLAYING;
			},

			async setStartLoopPosition() {
				this.startLoopPosition = await this.player.getCurrentTime();
			},
			async setEndLoopPosition() {
				this.endLoopPosition = await this.player.getCurrentTime();
			},

			async runLoop() {
				const that = this;
				clearTimeout(this.timerId);
				this.currPosition = await this.player.getCurrentTime();
				this.timerId = setTimeout(async function () {
					console.log('start');

					if (that.loopIsValid()) {
						that.isRepeating = true;
						const p = that.player;
						await p.seekTo(that.startLoopPosition);
						that.runLoop();
					}
				}, this.timeLeft());
			},
			stopLoop() {
				console.log('stop');
				this.isRepeating = false;
				clearTimeout(this.timerId);
				return;
			},
			loopIsValid() {
				return this.endLoopPosition > this.startLoopPosition;
			},
			timeLeft() {
				return (this.endLoopPosition - this.currPosition) * 1000;
			},
		},
		computed: {
			player() {
				return this.$refs.youtube.player;
			},
		},
		mounted() {
			// Listen Youtube player state changes (buffering, user's play/pause clicks)
			// https://stackoverflow.com/a/17087006/4992248
			this.player.addEventListener('onStateChange', this.onStateChange);
			this.playerState = {
				UNSTARTED: -1,
				ENDED: 0,
				PLAYING: 1,
				PAUSED: 2,
				BUFFERING: 3,
				VIDEO_CUED: 5,
			};
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
