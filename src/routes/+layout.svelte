<script lang="ts">
	// Import dependencies
	import '../app.css';
	import { onMount } from 'svelte';
	import { Menu, X, Sun, Moon } from 'lucide-svelte';

	// Component props
	let { children } = $props();

	// Reactive state management
	let theme = $state<'dark' | 'light'>('dark');
	const isDarkMode = $derived(theme === 'dark');
	let mobileNavOpen = $state(false);

	/**
	 * Smooth scroll to a specific element by ID
	 * @param elementId - The ID of the element to scroll to
	 */
	function smoothScrollTo(elementId: string) {
		const element = document.getElementById(elementId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	/**
	 * Navigate to a section and close mobile navigation
	 * @param elementId - The ID of the section to navigate to
	 */
	function navigateToSection(elementId: string) {
		mobileNavOpen = false;
		smoothScrollTo(elementId);
	}

	/**
	 * Apply theme changes to DOM and localStorage
	 * @param nextTheme - The theme to apply ('dark' or 'light')
	 */
	function applyTheme(nextTheme: 'dark' | 'light') {
		theme = nextTheme;
		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem('theme', nextTheme);
	}

	/**
	 * Toggle between dark and light themes
	 */
	function toggleTheme() {
		applyTheme(theme === 'dark' ? 'light' : 'dark');
	}

	// Component lifecycle: Initialize theme, scroll progress, and event listeners
	onMount(() => {
		// Load saved theme from localStorage or default to dark
		const saved = localStorage.getItem('theme');
		applyTheme(saved === 'light' ? 'light' : 'dark');
		
		// Scroll progress indicator setup
		let rafId: number | null = null;
		const progressBar = document.getElementById('scroll-progress');
		
		/**
		 * Update scroll progress bar width based on scroll position
		 */
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

		/**
		 * Handle scroll events with requestAnimationFrame for performance
		 */
		const onScroll = () => {
			if (rafId !== null) return;
			rafId = window.requestAnimationFrame(updateScrollProgress);
		};

		// Add scroll event listener
		window.addEventListener('scroll', onScroll, { passive: true });
		updateScrollProgress();

		// Keyboard navigation: close mobile nav on Escape key
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') mobileNavOpen = false;
		};
		window.addEventListener('keydown', onKeyDown);

		// Cleanup function for event listeners
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('keydown', onKeyDown);
			if (rafId !== null) window.cancelAnimationFrame(rafId);
		};
	});
</script>

<!-- SEO Meta Tags -->
<svelte:head>
	<title>Portfolio - Creative Developer</title>
	<meta name="description" content="Creative developer portfolio with modern design" />
</svelte:head>

<!-- Main Application Container -->
<div class="min-h-screen bg-dark-bg text-fg relative">
	<!-- Scroll Progress Indicator -->
	<div id="scroll-progress" class="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-green to-accent-blue z-50 transition-all duration-300" style="width: 0%"></div>
	
	<!-- Navigation Header -->
	<nav class="fixed top-0 w-full z-40">
		<div class="px-4 sm:px-6 py-4">
			<!-- Navigation Bar with Logo and Links -->
			<div class="max-w-7xl mx-auto glass-effect rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
				<!-- Logo/Brand Section -->
				<a href="#hero" class="flex items-center gap-3" onclick={(e) => (e.preventDefault(), navigateToSection('hero'))} aria-label="Go to top">
					<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-green/20 to-accent-blue/20 border border-fg/10 flex items-center justify-center">
						<span class="font-bold gradient-text">S</span>
					</div>
					<div class="leading-tight">
						<div class="text-sm text-fg/70">Portfolio</div>
						<div class="text-base font-semibold">Sakhawat Hossain</div>
					</div>
				</a>
				
				<!-- Desktop Navigation Links -->
				<div class="hidden md:flex items-center gap-2">
					<a href="#about" class="px-3 py-2 rounded-lg hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('about'))}>About</a>
					<a href="#projects" class="px-3 py-2 rounded-lg hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('projects'))}>Projects</a>
					<a href="#skills" class="px-3 py-2 rounded-lg hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('skills'))}>Skills</a>
					<a href="#blog" class="px-3 py-2 rounded-lg hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('blog'))}>Writing</a>
					<a href="#contact" class="px-3 py-2 rounded-lg hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('contact'))}>Contact</a>
				</div>

				<!-- Theme Toggle and Mobile Menu Buttons -->
				<div class="flex items-center gap-2">
					<!-- Theme Toggle Button -->
					<button
						onclick={toggleTheme}
						class="p-2 rounded-xl glass-effect hover:bg-fg/5 transition-colors"
						aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
						title={isDarkMode ? 'Light theme' : 'Dark theme'}
					>
						{#if isDarkMode}
							<Sun class="w-5 h-5" />
						{:else}
							<Moon class="w-5 h-5" />
						{/if}
					</button>
					<!-- Mobile Menu Toggle -->
					<button
						class="md:hidden p-2 rounded-xl glass-effect hover:bg-fg/5 transition-colors"
						aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
						onclick={() => (mobileNavOpen = !mobileNavOpen)}
					>
						{#if mobileNavOpen}
							<X class="w-5 h-5" />
						{:else}
							<Menu class="w-5 h-5" />
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if mobileNavOpen}
			<div class="md:hidden px-4 sm:px-6">
				<div class="max-w-7xl mx-auto glass-effect rounded-2xl px-4 py-4">
					<div class="grid gap-2">
						<a href="#about" class="px-4 py-3 rounded-xl hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('about'))}>About</a>
						<a href="#projects" class="px-4 py-3 rounded-xl hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('projects'))}>Projects</a>
						<a href="#skills" class="px-4 py-3 rounded-xl hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('skills'))}>Skills</a>
						<a href="#blog" class="px-4 py-3 rounded-xl hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('blog'))}>Writing</a>
						<a href="#contact" class="px-4 py-3 rounded-xl hover:bg-fg/5 transition-colors" onclick={(e) => (e.preventDefault(), navigateToSection('contact'))}>Contact</a>
					</div>
				</div>
			</div>
		{/if}
	</nav>

	<!-- Main Content Area -->
	<main class="relative z-10 pt-24">
		{@render children()}
	</main>

	<!-- Animated Background Elements -->
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
