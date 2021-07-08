<template>
	<button class="btn btn-primary" v-on:click="onClick">{{ content }}</button>
</template>

<script>
	export default {
		props: {
			content: String,
			onClick: Function,
		},
	};
</script>

<style></style>
