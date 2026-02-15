import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		paths: {
			// Empty base on Vercel so assets at /_app/... match build output; /Portfolio for GitHub Pages
			base: process.env.VERCEL ? '' : '/Portfolio'
		},
		prerender: {
			handleMissingId: 'ignore'
		}
	}
};

export default config;
