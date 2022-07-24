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
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'ZOMB',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content:
					'width = device-width, initial-scale = 1.0, minimum-scale = 1, maximum-scale = 1, user-scalable = no',
			},
			{
				name: 'apple-mobile-web-app-title',
				content: 'ZOMB',
			},
			{
				name: 'apple-mobile-web-app-capable',
				content: 'yes',
			},
			{
				name: 'apple-mobile-web-app-status-bar-style',
				content: 'black',
			},
			{
				hid: 'description',
				name: 'description',
				content: 'My astonishing Nuxt.js project',
			},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
			{ rel: 'apple-touch-icon', href: '/zomboid_192.png' },
			{ rel: 'apple-touch-icon', sizes: '76x76', href: '/zomboid_76.png' },
			{ rel: 'apple-touch-icon', sizes: '120x120', href: '/zomboid_120.png' },
			{ rel: 'apple-touch-icon', sizes: '152x152', href: '/zomboid_152.png' },
			{ rel: 'shortcut icon', sizes: '192x192', href: '/zomboid_192.png' },
			{ rel: 'shortcut icon', type: 'image/png', href: '/zomboid_192.png' },
			{
				// bootstrap
				rel: 'stylesheet',
				integrity:
					'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
				href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
				crossorigin: 'anonymous',
			},
			{
				// bootstrap icons
				rel: 'stylesheet',
				href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/vue-youtube.js'],
	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: ['@nuxtjs/pwa'],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: ['vue-youtube'],
	},
};
