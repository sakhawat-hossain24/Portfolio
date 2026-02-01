<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronDown, Code, Palette, Zap, ExternalLink, Github, Copy, Mail, X } from 'lucide-svelte';

	let currentText = $state('');
	let fullText = 'Developer & Learner';
	let charIndex = $state(0);
	let isDeleting = $state(false);
	let showEmailPopup = $state(false);
	let copySuccess = $state(false);
	const email = 'sakhawathossain3141@gmail.com';
	
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	}
	
	function openEmailClient() {
		window.location.href = `mailto:${email}`;
	}
	
	// Projects filtering
	let selectedCategory = $state('all');
	const categories = ['all', 'web', 'mobile', 'design', 'opensource'];
	
	interface Project {
		title: string;
		description: string;
		category: string;
		tech: string[];
	}
	
	const projects: Project[] = [];
	
	const filteredProjects = $derived(selectedCategory === 'all' 
		? projects 
		: projects.filter(p => p.category === selectedCategory));

	onMount(() => {
		let timeoutId: ReturnType<typeof setTimeout> | null = null;
		let cancelled = false;
		const schedule = (fn: () => void, ms: number) => {
			timeoutId = setTimeout(() => {
				if (cancelled) return;
				fn();
			}, ms);
		};

		const typeWriter = () => {
			if (cancelled) return;
			if (!isDeleting && charIndex < fullText.length) {
				currentText += fullText.charAt(charIndex);
				charIndex++;
				schedule(typeWriter, 100);
			} else if (isDeleting && charIndex > 0) {
				currentText = currentText.substring(0, charIndex - 1);
				charIndex--;
				schedule(typeWriter, 50);
			} else if (!isDeleting && charIndex === fullText.length) {
				schedule(() => {
					isDeleting = true;
					typeWriter();
				}, 2000);
			} else if (isDeleting && charIndex === 0) {
				isDeleting = false;
				schedule(typeWriter, 500);
			}
		};
		typeWriter();

		return () => {
			cancelled = true;
			if (timeoutId !== null) clearTimeout(timeoutId);
		};
	});
</script>

<!-- Hero Section -->
<section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden">
	<div class="absolute inset-0 gradient-bg animate-gradient opacity-30"></div>
	
	<div class="relative z-10 text-center px-6 max-w-6xl mx-auto">
		<div class="mb-8">
			<h1 class="text-5xl md:text-7xl font-bold mb-6">
				<span class="gradient-text">Hello, I'm a</span>
				<br />
				<span class="inline-flex items-baseline justify-center whitespace-nowrap">
					<span class="text-fg">{currentText}</span>
					<span class="animate-pulse">|</span>
				</span>
			</h1>
			
			<p class="text-xl md:text-2xl text-fg/80 mb-8 max-w-3xl mx-auto">
				I build break and rebuild. All from 
			</p>
		</div>

		<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
			<button class="px-8 py-4 bg-gradient-to-r from-accent-green to-accent-blue rounded-full font-semibold hover-lift">
				View My Work
			</button>
			<button class="px-8 py-4 glass-effect rounded-full font-semibold hover-lift border border-fg/20">
				Contact Me
			</button>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
			<div class="glass-effect p-6 rounded-xl hover-lift">
				<Code class="w-12 h-12 text-accent-green mx-auto mb-4" />
				<h3 class="text-xl font-semibold mb-2">Clean Code</h3>
				<p class="text-fg/70">Lorem ipsum dolor sit amet consectetur</p>
			</div>
			
			<div class="glass-effect p-6 rounded-xl hover-lift">
				<Palette class="w-12 h-12 text-accent-blue mx-auto mb-4" />
				<h3 class="text-xl font-semibold mb-2">Creative Design</h3>
				<p class="text-fg/70">Sed do eiusmod tempor incididunt</p>
			</div>
			
			<div class="glass-effect p-6 rounded-xl hover-lift">
				<Zap class="w-12 h-12 text-accent-green mx-auto mb-4" />
				<h3 class="text-xl font-semibold mb-2">Fast Performance</h3>
				<p class="text-fg/70">Ut labore et dolore magna aliqua</p>
			</div>
		</div>
	</div>

	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
		<ChevronDown class="w-8 h-8 text-accent-green" />
	</div>
</section>

<!-- About Section -->
<section id="about" class="py-20 px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-4xl md:text-5xl font-bold text-center mb-16">
			<span class="gradient-text">About Me</span>
		</h2>
		
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div class="space-y-6">
				<p class="text-lg text-fg/80">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
				</p>
				<p class="text-lg text-fg/80">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
				</p>
				<div class="flex flex-wrap gap-4">
					<span class="px-4 py-2 glass-effect rounded-full text-sm">JavaScript</span>
					<span class="px-4 py-2 glass-effect rounded-full text-sm">TypeScript</span>
					<span class="px-4 py-2 glass-effect rounded-full text-sm">React</span>
					<span class="px-4 py-2 glass-effect rounded-full text-sm">Svelte</span>
					<span class="px-4 py-2 glass-effect rounded-full text-sm">Node.js</span>
				</div>
			</div>
			
			<div class="relative">
				<div class="glass-effect p-8 rounded-2xl">
					<div class="space-y-6">
						<div>
							<div class="flex justify-between mb-2">
								<span class="text-fg/80">Frontend Development</span>
								<span class="text-accent-green">90%</span>
							</div>
							<div class="w-full bg-gray-700 rounded-full h-3">
								<div class="bg-gradient-to-r from-accent-green to-accent-blue h-3 rounded-full" style="width: 90%"></div>
							</div>
						</div>
						
						<div>
							<div class="flex justify-between mb-2">
								<span class="text-fg/80">UI/UX Design</span>
								<span class="text-accent-blue">85%</span>
							</div>
							<div class="w-full bg-gray-700 rounded-full h-3">
								<div class="bg-gradient-to-r from-accent-blue to-accent-green h-3 rounded-full" style="width: 85%"></div>
							</div>
						</div>
						
						<div>
							<div class="flex justify-between mb-2">
								<span class="text-fg/80">Backend Development</span>
								<span class="text-accent-green">75%</span>
							</div>
							<div class="w-full bg-gray-700 rounded-full h-3">
								<div class="bg-gradient-to-r from-accent-green to-accent-blue h-3 rounded-full" style="width: 75%"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="py-20 px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-4xl md:text-5xl font-bold text-center mb-16">
			<span class="gradient-text">Projects</span>
		</h2>
		
		<!-- Category Filter -->
		<div class="flex justify-center mb-12">
			<div class="glass-effect p-2 rounded-xl">
				<div class="flex flex-wrap gap-2">
					{#each categories as category}
						<button
							class={`px-4 py-2 rounded-lg transition-all duration-300 ${
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
			<div class="text-center py-16">
				<p class="text-xl text-fg/60 mb-4">No projects found</p>
				<p class="text-fg/40">Check back later for new projects!</p>
			</div>
		{:else}
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each filteredProjects as project}
					<div class="glass-effect rounded-xl overflow-hidden hover-lift group">
						<div class="h-48 bg-gradient-to-br from-dark-accent to-dark-surface relative">
							<div class="absolute inset-0 flex items-center justify-center">
								<div class="w-20 h-20 bg-gradient-to-r from-accent-green to-accent-blue rounded-lg opacity-50"></div>
							</div>
							<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
								<button class="p-2 glass-effect rounded-lg hover-lift">
									<ExternalLink class="w-5 h-5" />
								</button>
								<button class="p-2 glass-effect rounded-lg hover-lift">
									<Github class="w-5 h-5" />
								</button>
							</div>
						</div>
						
						<div class="p-6">
							<h3 class="text-xl font-semibold mb-2">{project.title}</h3>
							<p class="text-fg/70 mb-4">{project.description}</p>
							<div class="flex flex-wrap gap-2">
								{#each project.tech as tech}
									<span class="px-3 py-1 bg-dark-accent rounded-full text-xs">{tech}</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

		<!-- Skills Section -->
<section id="skills" class="py-20 px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-4xl md:text-5xl font-bold text-center mb-16">
			<span class="gradient-text">Skills</span>
		</h2>
		
		{#if true}
			<!-- Skills would be dynamically loaded here -->
			<div class="text-center py-16">
				<p class="text-xl text-fg/60 mb-4">Skills coming soon</p>
				<p class="text-fg/40">I'm currently working on showcasing my technical skills!</p>
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
<section id="blog" class="py-20 px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-4xl md:text-5xl font-bold text-center mb-16">
			<span class="gradient-text">Blog</span>
		</h2>
		
		{#if true}
			<!-- Blog posts would be dynamically loaded here -->
			<div class="text-center py-16">
				<p class="text-xl text-fg/60 mb-4">Blog coming soon</p>
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
<section id="contact" class="py-20 px-6">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-4xl md:text-5xl font-bold text-center mb-16">
			<span class="gradient-text">Get In Touch</span>
		</h2>
		
		<p class="text-xl text-fg/80 mb-12">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		</p>
		
		<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
			<button onclick={() => showEmailPopup = true} class="px-8 py-4 bg-gradient-to-r from-accent-green to-accent-blue rounded-full font-semibold hover-lift">
				Email Me
			</button>
			<a href="https://github.com/sakhawat-hossain24" target="_blank" rel="noopener noreferrer" class="px-8 py-4 glass-effect rounded-full font-semibold hover-lift border border-fg/20 inline-block">
				GitHub
			</a>
			<a href="https://www.linkedin.com/in/sakhawat-hossain09/" target="_blank" rel="noopener noreferrer" class="px-8 py-4 glass-effect rounded-full font-semibold hover-lift border border-fg/20 inline-block">
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
		class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" 
		role="dialog" 
		aria-modal="true"
		aria-labelledby="email-modal-title"
		tabindex="0"
		onclick={() => showEmailPopup = false}
		onkeydown={(e) => e.key === 'Escape' && (showEmailPopup = false)}
	>
		<div class="glass-effect rounded-2xl p-8 max-w-md w-full relative">
			<button 
				onclick={() => showEmailPopup = false}
				class="absolute top-4 right-4 p-2 rounded-lg glass-effect hover-lift text-fg/70 hover:text-fg"
				aria-label="Close email modal"
			>
				<X class="w-5 h-5" />
			</button>
			
			<div class="text-center mb-6">
				<h3 id="email-modal-title" class="text-2xl font-bold mb-2 gradient-text">Get In Touch</h3>
				<p class="text-fg/70">Feel free to reach out via email</p>
			</div>
			
			<div class="glass-effect rounded-lg p-4 mb-6">
				<div class="flex items-center justify-between">
					<span class="text-lg font-mono text-fg">{email}</span>
					<button
						onclick={copyEmail}
						class="p-2 rounded-lg glass-effect hover-lift text-fg/70 hover:text-fg transition-colors"
						title="Copy email"
					>
						{#if copySuccess}
							<span class="text-accent-green text-sm">Copied!</span>
						{:else}
							<Copy class="w-5 h-5" />
						{/if}
					</button>
				</div>
			</div>
			
			<div class="flex gap-4">
				<button
					onclick={copyEmail}
					class="flex-1 px-6 py-3 glass-effect rounded-lg font-semibold hover-lift border border-fg/20 flex items-center justify-center gap-2"
				>
					<Copy class="w-5 h-5" />
					{copySuccess ? 'Copied!' : 'Copy Email'}
				</button>
				<button
					onclick={openEmailClient}
					class="flex-1 px-6 py-3 bg-gradient-to-r from-accent-green to-accent-blue rounded-lg font-semibold hover-lift text-white flex items-center justify-center gap-2"
				>
					<Mail class="w-5 h-5" />
					Send Email
				</button>
			</div>
		</div>
	</div>
{/if}
