<script lang="ts">
	// Import dependencies
	import { onMount } from 'svelte';
	import { ChevronDown, Code, Palette, Zap, ExternalLink, Github, Copy, Mail, X, ArrowUpRight } from 'lucide-svelte';

	// Component state for typewriter effect
	let currentText = $state('');
	let fullText = 'Developer & Learner';
	let charIndex = $state(0);
	let isDeleting = $state(false);
	
	// Modal and interaction state
	let showEmailPopup = $state(false);
	let copySuccess = $state(false);
	const email = 'sakhawathossain3141@gmail.com';
	let modalPanel: HTMLDivElement | null = $state(null);
	
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
	 * Copy email address to clipboard with user feedback
	 */
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copySuccess = true;
			// Reset success state after 2 seconds
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	}
	
	/**
	 * Open default email client with pre-filled email
	 */
	function openEmailClient() {
		window.location.href = `mailto:${email}`;
	}
	
	// Projects filtering state and data
	let selectedCategory = $state('all');
	const categories = ['all', 'web', 'mobile', 'design', 'opensource'];
	
	/**
	 * Project interface for type safety
	 */
	interface Project {
		title: string;
		description: string;
		category: string;
		tech: string[];
		image?: string;
		liveUrl?: string;
		sourceUrl?: string;
	}
	
	/**
	 * Sample projects data - in a real app, this would come from a CMS or API
	 */
	const projects: Project[] = [
		{
			title: 'Portfolio Website',
			description: 'A fast, animated, and responsive portfolio built with SvelteKit + Tailwind.',
			category: 'web',
			tech: ['SvelteKit', 'TypeScript', 'TailwindCSS'],
			image: '/Portfolio/projects/portfolio-screenshot.png',
			liveUrl: 'https://sakhawat-hossain24.github.io/Portfolio/',
			sourceUrl: 'https://github.com/sakhawat-hossain24/Portfolio'
		},
	];
	
	/**
	 * Computed property for filtered projects based on selected category
	 */
	const filteredProjects = $derived(selectedCategory === 'all' 
		? projects 
		: projects.filter(p => p.category === selectedCategory));

	// Component lifecycle: Initialize typewriter effect and keyboard listeners
	onMount(() => {
		// Typewriter effect state management
		let timeoutId: ReturnType<typeof setTimeout> | null = null;
		let cancelled = false;
		
		/**
		 * Schedule a function to run after a delay, with cancellation support
		 * @param fn - Function to schedule
		 * @param ms - Delay in milliseconds
		 */
		const schedule = (fn: () => void, ms: number) => {
			timeoutId = setTimeout(() => {
				if (cancelled) return;
				fn();
			}, ms);
		};

		/**
		 * Typewriter animation effect for the hero section
		 * Types and deletes text character by character
		 */
		const typeWriter = () => {
			if (cancelled) return;
			
			// Typing forward
			if (!isDeleting && charIndex < fullText.length) {
				currentText += fullText.charAt(charIndex);
				charIndex++;
				schedule(typeWriter, 100); // Typing speed
			} 
			// Deleting backward
			else if (isDeleting && charIndex > 0) {
				currentText = currentText.substring(0, charIndex - 1);
				charIndex--;
				schedule(typeWriter, 50); // Deleting speed (faster)
			} 
			// Pause at end of typing, then start deleting
			else if (!isDeleting && charIndex === fullText.length) {
				schedule(() => {
					isDeleting = true;
					typeWriter();
				}, 2000); // Pause before deleting
			} 
			// Start typing again after deletion
			else if (isDeleting && charIndex === 0) {
				isDeleting = false;
				schedule(typeWriter, 500); // Pause before retyping
			}
		};
		
		// Start the typewriter effect
		typeWriter();

		// Keyboard navigation: close modal on Escape key
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			showEmailPopup = false;
		};
		window.addEventListener('keydown', onKeyDown);

		// Cleanup function for timeouts and event listeners
		return () => {
			cancelled = true;
			if (timeoutId !== null) clearTimeout(timeoutId);
			window.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<!-- Hero Section -->
<section id="hero" class="min-h-screen flex items-start justify-center relative overflow-hidden pt-12 sm:pt-8">
	<!-- Animated gradient background -->
	<div class="absolute inset-0 gradient-bg animate-gradient opacity-30"></div>
	
	<!-- Hero content container -->
	<div class="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto mt-6 sm:mt-8">
		<!-- Main heading with typewriter effect -->
		<div>
			<!-- Profile picture and name container -->
			<div class="flex flex-col items-center">
				<div class="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-4 sm:mb-6 ring-4 ring-fg/10 glass-effect">
					<img 
						src="/Portfolio/projects/profile-picture.png" 
						alt="Sakhawat Hossain" 
						class="w-full h-full object-cover"
					/>
				</div>
				<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-2 sm:mb-3">
					<span class="gradient-text">Hi, I'm Sakhawat.</span>
					<br />
					<!-- Typewriter animation container -->
					<span class="inline-flex items-baseline justify-center whitespace-nowrap">
						<span class="text-fg">{currentText}</span>
						<span class="animate-pulse">|</span>
					</span>
				</h1>
			</div>
			
			<!-- Hero description -->
			<p class="text-base sm:text-lg md:text-xl text-fg/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
				I build things, break them, and rebuild them, learning from what doesn't go well.
			</p>
		</div>

		<!-- Call-to-action buttons -->
		<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
			<button onclick={() => smoothScrollTo('projects')} class="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent-green to-accent-blue rounded-full font-semibold hover-lift text-base sm:text-lg touch-manipulation">
				View Projects
			</button>
			<button onclick={() => smoothScrollTo('contact')} class="px-6 sm:px-8 py-3 sm:py-4 glass-effect rounded-full font-semibold hover-lift border border-fg/20 text-base sm:text-lg touch-manipulation">
				Let's Talk
			</button>
		</div>

		<!-- Feature highlights grid -->
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
			<!-- Clean Code feature -->
			<div class="glass-effect p-4 sm:p-6 rounded-xl hover-lift">
				<Code class="w-10 h-10 sm:w-12 sm:h-12 text-accent-green mx-auto mb-3 sm:mb-4" />
				<h3 class="text-lg sm:text-xl font-semibold mb-2">Clean Code</h3>
				<p class="text-sm sm:text-base text-fg/70">Learning to write code that's readable and maintainable.</p>
			</div>
			
			<!-- Design Taste feature -->
			<div class="glass-effect p-4 sm:p-6 rounded-xl hover-lift">
				<Palette class="w-10 h-10 sm:w-12 sm:h-12 text-accent-blue mx-auto mb-3 sm:mb-4" />
				<h3 class="text-lg sm:text-xl font-semibold mb-2">Design with Intent</h3>
				<p class="text-sm sm:text-base text-fg/70">Exploring modern UI, spacing, and typography.</p>
			</div>
			
			<!-- Performance feature -->
			<div class="glass-effect p-4 sm:p-6 rounded-xl hover-lift">
				<Zap class="w-10 h-10 sm:w-12 sm:h-12 text-accent-green mx-auto mb-3 sm:mb-4" />
				<h3 class="text-lg sm:text-xl font-semibold mb-2">Fast by Default</h3>
				<p class="text-sm sm:text-base text-fg/70">Thinking about performance from the start.</p>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-24 sm:bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce">
		<ChevronDown class="w-6 h-6 sm:w-8 sm:h-8 text-accent-green" />
	</div>
</section>

<!-- About Section -->
<section id="about" class="py-16 sm:py-24 px-4 sm:px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
			<span class="gradient-text">About Me</span>
		</h2>
		
		<div class="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
			<div class="space-y-4 sm:space-y-6">
				<p class="text-base sm:text-lg text-fg/80 leading-relaxed">
					I enjoy building products end-to-end, from structuring components to refining UI details.
				</p>
				<p class="text-base sm:text-lg text-fg/80 leading-relaxed">
					I'm currently focused on learning modern frontend development, exploring design systems, and becoming more performance-aware.
				</p>
				<div class="flex flex-wrap gap-2 sm:gap-3">
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">HTML</span>
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">CSS</span>
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">JavaScript</span>
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">Python</span>
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">SQL</span>
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">Git</span>
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">Docker</span>
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">Supabase</span>
					<span class="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full text-xs sm:text-sm">Linux</span>
				</div>
			</div>
			
			<div class="relative">
				<div class="glass-effect p-6 sm:p-8 rounded-2xl">
					<div class="space-y-4 sm:space-y-6">
						<div>
							<div class="flex justify-between mb-2">
								<span class="text-sm sm:text-base text-fg/80">Frontend Development</span>
								<span class="text-sm sm:text-base text-accent-green">30%</span>
							</div>
							<div class="w-full bg-gray-700 rounded-full h-2 sm:h-3">
								<div class="bg-gradient-to-r from-accent-green to-accent-blue h-2 sm:h-3 rounded-full" style="width: 30%"></div>
							</div>
						</div>
						
						<div>
							<div class="flex justify-between mb-2">
								<span class="text-sm sm:text-base text-fg/80">UI/UX Design</span>
								<span class="text-sm sm:text-base text-accent-blue">10%</span>
							</div>
							<div class="w-full bg-gray-700 rounded-full h-2 sm:h-3">
								<div class="bg-gradient-to-r from-accent-blue to-accent-green h-2 sm:h-3 rounded-full" style="width: 10%"></div>
							</div>
						</div>
						
						<div>
							<div class="flex justify-between mb-2">
								<span class="text-sm sm:text-base text-fg/80">Backend Development</span>
								<span class="text-sm sm:text-base text-accent-green">50%</span>
							</div>
							<div class="w-full bg-gray-700 rounded-full h-2 sm:h-3">
								<div class="bg-gradient-to-r from-accent-green to-accent-blue h-2 sm:h-3 rounded-full" style="width: 50%"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="py-16 sm:py-24 px-4 sm:px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
			<span class="gradient-text">Projects</span>
		</h2>
		
		<!-- Category Filter -->
		<div class="flex justify-center mb-8 sm:mb-12">
			<div class="glass-effect p-2 rounded-xl">
				<div class="flex flex-wrap gap-2 justify-center">
					{#each categories as category}
						<button
							class={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${
								selectedCategory === category
									? 'bg-gradient-to-r from-accent-green to-accent-blue text-fg'
									: 'text-fg/70 hover:text-fg'
							}`}
							onclick={() => (selectedCategory = category)}
						>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</button>
					{/each}
				</div>
			</div>
		</div>
		
		<!-- Projects Grid -->
		{#if filteredProjects.length === 0}
			<div class="text-center py-12 sm:py-16">
				<p class="text-lg sm:text-xl text-fg/60 mb-4">No projects found</p>
				<p class="text-fg/40">Check back later for new projects!</p>
			</div>
		{:else}
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
				{#each filteredProjects as project}
					<div class="glass-effect rounded-xl overflow-hidden hover-lift group">
						<div class="h-40 sm:h-48 bg-gradient-to-br from-dark-accent to-dark-surface relative overflow-hidden">
							{#if project.image}
								<img 
									src={project.image} 
									alt={project.title}
									class="w-full h-full object-cover"
								/>
							{:else}
								<div class="absolute inset-0 flex items-center justify-center">
									<div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-accent-green to-accent-blue rounded-lg opacity-50"></div>
								</div>
							{/if}
							<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 sm:gap-4">
								{#if project.liveUrl}
									<a href={project.liveUrl} class="p-2 sm:p-2 glass-effect rounded-lg hover-lift" target={project.liveUrl.startsWith('#') ? undefined : '_blank'} rel={project.liveUrl.startsWith('#') ? undefined : 'noopener noreferrer'} aria-label="Open live project">
										<ExternalLink class="w-4 h-4 sm:w-5 sm:h-5" />
									</a>
								{/if}
								{#if project.sourceUrl}
									<a href={project.sourceUrl} class="p-2 sm:p-2 glass-effect rounded-lg hover-lift" target="_blank" rel="noopener noreferrer" aria-label="Open source code">
										<Github class="w-4 h-4 sm:w-5 sm:h-5" />
									</a>
								{/if}
							</div>
						</div>
						
						<div class="p-4 sm:p-6">
							<h3 class="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
							<p class="text-sm sm:text-base text-fg/70 mb-4">{project.description}</p>
							<div class="flex flex-wrap gap-1.5 sm:gap-2">
								{#each project.tech as tech}
									<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">{tech}</span>
								{/each}
							</div>
							{#if project.liveUrl && !project.liveUrl.startsWith('#')}
								<div class="mt-4 sm:mt-5">
									<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-fg/80 hover:text-fg transition-colors">
										<span class="gradient-text">View details</span>
										<ArrowUpRight class="w-3 h-3 sm:w-4 sm:h-4" />
									</a>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

		<!-- Skills Section -->
<section id="skills" class="py-16 sm:py-24 px-4 sm:px-6">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
				<span class="gradient-text">Skills</span>
			</h2>
			
			{#if true}
				<!-- Skills would be dynamically loaded here -->
				<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					<div class="glass-effect p-4 sm:p-6 rounded-xl hover-lift">
						<div class="text-sm text-fg/60 mb-2">Frontend</div>
						<div class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Learning to build clear, responsive interfaces</div>
						<div class="flex flex-wrap gap-1.5 sm:gap-2">
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">SvelteKit</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">React</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">TypeScript</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">TailwindCSS</span>
						</div>
					</div>
					<div class="glass-effect p-4 sm:p-6 rounded-xl hover-lift">
						<div class="text-sm text-fg/60 mb-2">Backend</div>
						<div class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Building simple APIs that get the job done</div>
						<div class="flex flex-wrap gap-1.5 sm:gap-2">
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">Node.js</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">Supabase</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">SQL</span>
						</div>
					</div>
					<div class="glass-effect p-4 sm:p-6 rounded-xl hover-lift">
						<div class="text-sm text-fg/60 mb-2">Design</div>
						<div class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Thinking in components and systems</div>
						<div class="flex flex-wrap gap-1.5 sm:gap-2">
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">Figma</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">Design Systems</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">Accessibility</span>
						</div>
					</div>
					<div class="glass-effect p-4 sm:p-6 rounded-xl hover-lift">
						<div class="text-sm text-fg/60 mb-2">Workflow</div>
						<div class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Learning to ship and iterate</div>
						<div class="flex flex-wrap gap-1.5 sm:gap-2">
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">Git</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">Code Review</span>
							<span class="px-2 sm:px-3 py-1 bg-dark-accent rounded-full text-xs">Docker</span>
						</div>
					</div>
				</div>
		{:else}
			<!-- <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				<div class="glass-effect p-6 rounded-xl text-center hover-lift">
					<div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-accent-green to-accent-blue rounded-full flex items-center justify-center">
						<span class="text-2xl font-bold">95%</span>
					</div>
					<h3 class="text-xl font-semibold mb-2">Frontend</h3>
					<p class="text-fg/70 text-sm">React, Vue, Svelte, TypeScript</p>
				</div>
				
				<div class="glass-effect p-6 rounded-xl text-center hover-lift">
					<div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-green rounded-full flex items-center justify-center">
						<span class="text-2xl font-bold">85%</span>
					</div>
					<h3 class="text-xl font-semibold mb-2">Backend</h3>
					<p class="text-fg/70 text-sm">Node.js, Python, PostgreSQL</p>
				</div>
				
				<div class="glass-effect p-6 rounded-xl text-center hover-lift">
					<div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-accent-green to-accent-blue rounded-full flex items-center justify-center">
						<span class="text-2xl font-bold">90%</span>
					</div>
					<h3 class="text-xl font-semibold mb-2">Design</h3>
					<p class="text-fg/70 text-sm">Figma, Adobe XD, TailwindCSS</p>
				</div>
				
				<div class="glass-effect p-6 rounded-xl text-center hover-lift">
					<div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-green rounded-full flex items-center justify-center">
						<span class="text-2xl font-bold">80%</span>
					</div>
					<h3 class="text-xl font-semibold mb-2">DevOps</h3>
					<p class="text-fg/70 text-sm">Docker, CI/CD, AWS</p>
				</div>
			</div> -->
		{/if}
	</div>
</section>

		<!-- Blog Section -->
<section id="blog" class="py-16 sm:py-24 px-4 sm:px-6">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
				<span class="gradient-text">Blog</span>
			</h2>
			
			{#if true}
				<!-- Blog posts would be dynamically loaded here -->
				<div class="text-center py-12 sm:py-16">
					<p class="text-lg sm:text-xl text-fg/60 mb-4">Blog coming soon</p>
					<p class="text-fg/40">I'm working on sharing my thoughts and experiences!</p>
				</div>
		{:else}
			<!-- <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div class="glass-effect rounded-xl overflow-hidden hover-lift">
					<div class="h-48 bg-gradient-to-br from-dark-accent to-dark-surface"></div>
					<div class="p-6">
						<div class="text-sm text-accent-green mb-2">Nov 15, 2024</div>
						<h3 class="text-xl font-semibold mb-2">Building Modern Web Apps with Svelte</h3>
						<p class="text-fg/70 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.</p>
						<button class="text-accent-blue hover:text-accent-green transition-colors">Read More →</button>
					</div>
				</div>
				
				<div class="glass-effect rounded-xl overflow-hidden hover-lift">
					<div class="h-48 bg-gradient-to-br from-dark-accent to-dark-surface"></div>
					<div class="p-6">
						<div class="text-sm text-accent-green mb-2">Nov 10, 2024</div>
						<h3 class="text-xl font-semibold mb-2">TypeScript Best Practices</h3>
						<p class="text-fg/70 mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						<button class="text-accent-blue hover:text-accent-green transition-colors">Read More →</button>
					</div>
				</div>
				
				<div class="glass-effect rounded-xl overflow-hidden hover-lift">
					<div class="h-48 bg-gradient-to-br from-dark-accent to-dark-surface"></div>
					<div class="p-6">
						<div class="text-sm text-accent-green mb-2">Nov 5, 2024</div>
						<h3 class="text-xl font-semibold mb-2">CSS Grid vs Flexbox</h3>
						<p class="text-fg/70 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
						<button class="text-accent-blue hover:text-accent-green transition-colors">Read More →</button>
					</div>
				</div>
			</div> -->
		{/if}
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="py-16 sm:py-24 px-4 sm:px-6">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
			<span class="gradient-text">Get In Touch</span>
		</h2>
		
		<p class="text-base sm:text-lg sm:text-xl text-fg/80 mb-8 sm:mb-12 leading-relaxed">
			Have an idea, a project, or a role? Send me a message and I'll get back to you.
		</p>
		
		<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
			<button onclick={() => (showEmailPopup = true)} class="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent-green to-accent-blue rounded-full font-semibold hover-lift text-base sm:text-lg touch-manipulation">
				Email Me
			</button>
			<a href="https://github.com/sakhawat-hossain24" target="_blank" rel="noopener noreferrer" class="px-6 sm:px-8 py-3 sm:py-4 glass-effect rounded-full font-semibold hover-lift border border-fg/20 inline-block text-base sm:text-lg touch-manipulation">
				GitHub
			</a>
			<a href="https://www.linkedin.com/in/sakhawat-hossain09/" target="_blank" rel="noopener noreferrer" class="px-6 sm:px-8 py-3 sm:py-4 glass-effect rounded-full font-semibold hover-lift border border-fg/20 inline-block text-base sm:text-lg touch-manipulation">
				LinkedIn
			</a>
		</div>
		
		<!-- Vibe Coded Badge -->
		<div class="text-center text-fg/60 text-sm">
			<span class="inline-flex items-center gap-2 px-3 py-1 glass-effect rounded-full">
				✨ Vibe Coded with AI
			</span>
		</div>
	</div>
</section>

<!-- Email Popup Modal -->
{#if showEmailPopup}
	<div 
		class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6" 
		role="dialog" 
		aria-modal="true"
		aria-labelledby="email-modal-title"
		tabindex="-1"
		onclick={(e) => e.currentTarget === e.target && (showEmailPopup = false)}
		onkeydown={(e) => e.key === 'Escape' && (showEmailPopup = false)}
	>
		<div bind:this={modalPanel} class="glass-effect rounded-2xl p-6 sm:p-8 max-w-md w-full relative">
			<button 
				onclick={() => (showEmailPopup = false)}
				class="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 sm:p-2 rounded-lg glass-effect hover-lift text-fg/70 hover:text-fg touch-manipulation"
				aria-label="Close email modal"
			>
				<X class="w-4 h-4 sm:w-5 sm:h-5" />
			</button>
			
			<div class="text-center mb-4 sm:mb-6">
				<h3 id="email-modal-title" class="text-xl sm:text-2xl font-bold mb-2 gradient-text">Get In Touch</h3>
				<p class="text-sm sm:text-base text-fg/70">Feel free to reach out via email</p>
			</div>
			
			<div class="glass-effect rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
				<div class="flex items-center justify-between">
					<span class="text-sm sm:text-lg font-mono text-fg break-all">{email}</span>
					<button
						onclick={copyEmail}
						class="p-2 sm:p-2 rounded-lg glass-effect hover-lift text-fg/70 hover:text-fg transition-colors touch-manipulation flex-shrink-0 ml-2"
						title="Copy email"
					>
						{#if copySuccess}
							<span class="text-accent-green text-xs sm:text-sm">Copied!</span>
						{:else}
							<Copy class="w-4 h-4 sm:w-5 sm:h-5" />
						{/if}
					</button>
				</div>
			</div>
			
			<div class="flex gap-3 sm:gap-4">
				<button
					onclick={copyEmail}
					class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 glass-effect rounded-lg font-semibold hover-lift border border-fg/20 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
				>
					<Copy class="w-4 h-4 sm:w-5 sm:h-5" />
					{copySuccess ? 'Copied!' : 'Copy Email'}
				</button>
				<button
					onclick={openEmailClient}
					class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-accent-green to-accent-blue rounded-lg font-semibold hover-lift text-white flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
				>
					<Mail class="w-4 h-4 sm:w-5 sm:h-5" />
					Send Email
				</button>
			</div>
		</div>
	</div>
{/if}
