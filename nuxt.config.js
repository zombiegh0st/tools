const path = require('path');
const fs = require('fs');

export default {
	dev: process.env.NODE_ENV !== 'production',
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',
	server: {
		port: 8000, // default: 3000
		host: '0.0.0.0', // default: localhost,
		timing: false,

		// https:
		// function() {
		// 	if (this.dev) return {};
		// 	else
		// 		return
		// {
		// 	key: fs.readFileSync(path.resolve(__dirname, 'certs/', 'server.key')),
		// 	cert: fs.readFileSync(path.resolve(__dirname, 'certs/', 'server.crt')),
		// },
		// ;
		// },
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'nuxtjs',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: 'My astonishing Nuxt.js project',
			},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				integrity:
					'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
				href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
				crossorigin: 'anonymous',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
};
