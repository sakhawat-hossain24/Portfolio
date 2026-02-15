<script lang="ts">
	// Import dependencies
	import '../app.css';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
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
	<title>Sakhawat Hossain | Developer Portfolio</title>
	<meta name="description" content="Developer portfolio of Sakhawat Hossain featuring projects, skills, and contact information." />
	<link rel="canonical" href="https://sakhawat-hossain24.github.io/Portfolio/" />
	<meta name="theme-color" content="#0a0a0f" media="(prefers-color-scheme: dark)" />
	<meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
	<meta property="og:title" content="Sakhawat Hossain | Developer Portfolio" />
	<meta property="og:description" content="Projects, skills, and contact information for developer Sakhawat Hossain." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://sakhawat-hossain24.github.io/Portfolio/" />
	<meta property="og:image" content={`https://sakhawat-hossain24.github.io${base}/projects/portfolio-screenshot.png`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Sakhawat Hossain | Developer Portfolio" />
	<meta name="twitter:description" content="Projects, skills, and contact information for developer Sakhawat Hossain." />
	<meta name="twitter:image" content={`https://sakhawat-hossain24.github.io${base}/projects/portfolio-screenshot.png`} />
	<!-- Favicon using letter S icon -->
	<link rel="icon" type="image/png" href="{base}/projects/favicon.png" />
	<link rel="apple-touch-icon" href="{base}/projects/favicon.png" />
	<!-- Image attribution: Letter S icon from Flaticon - https://www.flaticon.com/free-icon/letter-s_3665980 -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Sakhawat Hossain",
			"url": "https://sakhawat-hossain24.github.io/Portfolio/",
			"sameAs": [
				"https://github.com/sakhawat-hossain24",
				"https://www.linkedin.com/in/sakhawat-hossain09/"
			],
			"jobTitle": "Developer"
		}
	</script>
</svelte:head>

<!-- Main Application Container -->
<div class="min-h-screen bg-dark-bg text-fg relative">
	<a href="#main" class="skip-link">Skip to content</a>
	<!-- Scroll Progress Indicator -->
	<div id="scroll-progress" class="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-green to-accent-blue z-50 transition-all duration-300" style="width: 0%"></div>
	
	<!-- Navigation Header -->
	<nav class="fixed top-0 w-full z-40">
		<div class="px-4 sm:px-6 py-4">
			<!-- Navigation Bar with Logo and Links -->
			<div class="max-w-7xl mx-auto glass-effect rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
				<!-- Logo/Brand Section -->
				<a href="#hero" class="flex items-center gap-3" onclick={(e) => (e.preventDefault(), navigateToSection('hero'))} aria-label="Go to top">
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
							class="hidden md:flex p-3 rounded-xl glass-effect hover:bg-fg/5 transition-colors touch-manipulation"
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
						class="md:hidden p-3 rounded-xl glass-effect hover:bg-fg/5 transition-colors touch-manipulation"
						aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileNavOpen}
						aria-controls="mobile-nav"
						onclick={() => (mobileNavOpen = !mobileNavOpen)}
					>
						{#if mobileNavOpen}
							<X class="w-6 h-6" />
						{:else}
							<Menu class="w-6 h-6" />
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if mobileNavOpen}
			<div id="mobile-nav" class="md:hidden fixed inset-0 top-16 z-30 px-4 sm:px-6 pt-4">
				<div class="max-w-7xl mx-auto glass-effect rounded-2xl px-4 py-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
					<div class="grid gap-1">
						<a href="#about" class="px-4 py-4 rounded-xl hover:bg-fg/5 transition-colors text-lg font-medium" onclick={(e) => (e.preventDefault(), navigateToSection('about'))}>About</a>
						<a href="#projects" class="px-4 py-4 rounded-xl hover:bg-fg/5 transition-colors text-lg font-medium" onclick={(e) => (e.preventDefault(), navigateToSection('projects'))}>Projects</a>
						<a href="#skills" class="px-4 py-4 rounded-xl hover:bg-fg/5 transition-colors text-lg font-medium" onclick={(e) => (e.preventDefault(), navigateToSection('skills'))}>Skills</a>
						<a href="#blog" class="px-4 py-4 rounded-xl hover:bg-fg/5 transition-colors text-lg font-medium" onclick={(e) => (e.preventDefault(), navigateToSection('blog'))}>Writing</a>
						<a href="#contact" class="px-4 py-4 rounded-xl hover:bg-fg/5 transition-colors text-lg font-medium" onclick={(e) => (e.preventDefault(), navigateToSection('contact'))}>Contact</a>
					</div>
					
					<!-- Mobile theme toggle in menu -->
					<div class="mt-6 pt-6 border-t border-fg/10">
						<button
							onclick={toggleTheme}
							class="w-full px-4 py-3 rounded-xl glass-effect hover:bg-fg/5 transition-colors flex items-center justify-center gap-3 font-medium"
							aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
						>
							{#if isDarkMode}
								<Sun class="w-5 h-5" />
								<span>Light Theme</span>
							{:else}
								<Moon class="w-5 h-5" />
								<span>Dark Theme</span>
							{/if}
						</button>
					</div>
				</div>
			</div>
		{/if}
	</nav>

	<!-- Main Content Area -->
	<main id="main" class="relative z-10 pt-24">
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
