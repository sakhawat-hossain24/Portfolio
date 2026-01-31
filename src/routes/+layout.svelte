<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();
	let theme = $state<'dark' | 'light'>('dark');
	const isDarkMode = $derived(theme === 'dark');

	// Smooth scroll function
	function smoothScrollTo(elementId: string) {
		const element = document.getElementById(elementId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function applyTheme(nextTheme: 'dark' | 'light') {
		theme = nextTheme;
		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem('theme', nextTheme);
	}

	function toggleTheme() {
		applyTheme(theme === 'dark' ? 'light' : 'dark');
	}

	onMount(() => {
		const saved = localStorage.getItem('theme');
		applyTheme(saved === 'light' ? 'light' : 'dark');
		
		// Add scroll progress indicator
		let rafId: number | null = null;
		const progressBar = document.getElementById('scroll-progress');
		const updateScrollProgress = () => {
			rafId = null;
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			if (progressBar) {
				const clamped = Math.min(100, Math.max(0, scrollPercent));
				progressBar.style.width = `${clamped}%`;
			}
		};

		const onScroll = () => {
			if (rafId !== null) return;
			rafId = window.requestAnimationFrame(updateScrollProgress);
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		updateScrollProgress();

		return () => {
			window.removeEventListener('scroll', onScroll);
			if (rafId !== null) window.cancelAnimationFrame(rafId);
		};
	});
</script>

<svelte:head>
	<title>Portfolio - Creative Developer</title>
	<meta name="description" content="Creative developer portfolio with modern design" />
</svelte:head>

<div class="min-h-screen bg-dark-bg text-fg relative">
	<!-- Scroll Progress Bar -->
	<div id="scroll-progress" class="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-green to-accent-blue z-50 transition-all duration-300" style="width: 0%"></div>
	
	<!-- Navigation -->
	<nav class="fixed top-0 w-full glass-effect z-40 px-6 py-4">
		<div class="max-w-7xl mx-auto flex justify-between items-center">
			<div class="text-2xl font-bold gradient-text">Portfolio</div>
			
			<div class="hidden md:flex space-x-8">
				<button onclick={() => smoothScrollTo('hero')} class="hover:text-accent-green transition-colors">Home</button>
				<button onclick={() => smoothScrollTo('about')} class="hover:text-accent-green transition-colors">About</button>
				<button onclick={() => smoothScrollTo('projects')} class="hover:text-accent-green transition-colors">Projects</button>
				<button onclick={() => smoothScrollTo('skills')} class="hover:text-accent-green transition-colors">Skills</button>
				<button onclick={() => smoothScrollTo('blog')} class="hover:text-accent-green transition-colors">Blog</button>
				<button onclick={() => smoothScrollTo('contact')} class="hover:text-accent-green transition-colors">Contact</button>
			</div>
			
			<button onclick={toggleTheme} class="p-2 rounded-lg glass-effect hover-lift">
				{isDarkMode ? '☀️' : '🌙'}
			</button>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="relative z-10">
		{@render children()}
	</main>

	<!-- Floating Background Elements -->
	<div class="fixed inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-accent-green/20 to-accent-blue/20 rounded-full blur-3xl animate-float"></div>
		<div class="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-accent-blue/20 to-purple-500/20 rounded-full blur-3xl animate-float" style="animation-delay: 2s"></div>
		<div class="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-accent-green/20 rounded-full blur-3xl animate-float" style="animation-delay: 4s"></div>
	</div>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
