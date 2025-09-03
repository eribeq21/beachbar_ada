<script>
	let { data } = $props();

	// Build category list without Set (simple loop)
	let categories = $state([]);
	for (let i = 0; i < data.products.length; i++) {
		let cat = data.products[i].category_name;
		if (!categories.includes(cat)) {
			categories.push(cat);
		}
	}

	// Group products by category
	let groupedProducts = $derived(
		categories.reduce((acc, cat) => {
			acc[cat] = data.products.filter((p) => p.category_name === cat);
			return acc;
		}, {})
	);

	// Check if there are any available products at all
	let hasProducts = $derived(data.products.length > 0);

	let categoryColors = $derived({
		[categories[0] || 'default']: {
			bg: 'from-rose-500 to-pink-600',
			text: 'text-rose-600',
			accent: 'bg-rose-100',
			border: 'border-rose-200',
			hover: 'hover:from-rose-600 hover:to-pink-700'
		},
		[categories[1] || 'default']: {
			bg: 'from-emerald-500 to-teal-600',
			text: 'text-emerald-600',
			accent: 'bg-emerald-100',
			border: 'border-emerald-200',
			hover: 'hover:from-emerald-600 hover:to-teal-700'
		},
		[categories[2] || 'default']: {
			bg: 'from-blue-500 to-indigo-600',
			text: 'text-blue-600',
			accent: 'bg-blue-100',
			border: 'border-blue-200',
			hover: 'hover:from-blue-600 hover:to-indigo-700'
		},
		[categories[3] || 'default']: {
			bg: 'from-amber-500 to-orange-600',
			text: 'text-amber-600',
			accent: 'bg-amber-100',
			border: 'border-amber-200',
			hover: 'hover:from-amber-600 hover:to-orange-700'
		},
		default: {
			bg: 'from-violet-500 to-purple-600',
			text: 'text-violet-600',
			accent: 'bg-violet-100',
			border: 'border-violet-200',
			hover: 'hover:from-violet-600 hover:to-purple-700'
		}
	});

	let activeSection = $state('');
	
	function handleScroll() {
		const sections = categories.map(cat => document.getElementById(cat)).filter(Boolean);
		const scrollPos = window.scrollY + 200;
		
		for (let section of sections) {
			if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
				activeSection = section.id;
				break;
			}
		}
	}
</script>

<svelte:window onscroll={handleScroll} />

<!-- Enhanced background with animated mesh gradient -->
<div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-sans relative overflow-hidden">
	<!-- Animated background elements -->
	<div class="fixed inset-0 opacity-30 pointer-events-none">
		<div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-300 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
		<div class="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-emerald-300 to-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
		<div class="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
	</div>

	<header class="relative h-[70vh] bg-cover bg-center overflow-hidden" style="background-image: url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/15/eb/c7/the-best-beach-bar-in.jpg?w=900&h=500&s=1');">
		<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
		<div class="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-amber-900/20"></div>
		
		<div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-float"></div>
		<div class="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-float animation-delay-1000"></div>
		<div class="absolute bottom-1/3 left-1/5 w-3 h-3 bg-white/30 rounded-full animate-float animation-delay-2000"></div>
		
		<div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
			<div class="mb-6 w-20 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full animate-pulse"></div>
			<h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight drop-shadow-2xl animate-fade-in-down bg-gradient-to-r from-white via-rose-100 to-amber-100 bg-clip-text text-transparent">
				Strandbar Ada
			</h1>
			<p class="mt-6 text-xl sm:text-2xl md:text-3xl font-light tracking-wide opacity-90 animate-fade-in-up max-w-2xl leading-relaxed">
				Where Every Bite Tells a Story of <span class="font-semibold text-amber-300">Culinary Excellence</span>
			</p>
			<div class="mt-8 flex gap-4 animate-fade-in-up animation-delay-500">
				<div class="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
					<a href="/login">Login</a>
				</div>
				<div class="px-6 py-3 border-2 border-white/30 hover:border-white/60 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm cursor-pointer">
					<a href="/sign_up">Sign Up</a>
				</div>
			</div>
		</div>
	</header>

	<nav class="sticky top-0 bg-white/90 backdrop-blur-md shadow-lg z-30 py-4 border-b border-gray-200/50">
		<div class="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap justify-center gap-3">
			{#each categories as cat}
				{#if groupedProducts[cat].length > 0}
					{@const colors = categoryColors[cat] || categoryColors.default}
					<a 
						href={`#${cat}`} 
						class="group relative px-6 py-3 text-sm font-semibold text-gray-700 hover:text-white bg-gradient-to-r {colors.bg} {colors.hover} rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg {activeSection === cat ? 'scale-105 shadow-lg text-white' : 'bg-gray-100 hover:bg-gradient-to-r'}"
					>
						<span class="relative z-10">{cat}</span>
						<div class="absolute inset-0 bg-gradient-to-r {colors.bg} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</a>
				{/if}
			{/each}
		</div>
	</nav>

	<div class="py-16 px-4 sm:px-8 relative z-10">
		{#each categories as cat}
			{#if groupedProducts[cat].length > 0}
				{@const colors = categoryColors[cat] || categoryColors.default}
				<section id={cat} class="mb-20 max-w-7xl mx-auto scroll-mt-24">
					<div class="text-center mb-12">
						<div class="inline-flex items-center gap-4 mb-4">
							<div class="w-12 h-0.5 bg-gradient-to-r {colors.bg} rounded-full"></div>
							<div class="w-3 h-3 bg-gradient-to-r {colors.bg} rounded-full animate-pulse"></div>
							<div class="w-12 h-0.5 bg-gradient-to-r {colors.bg} rounded-full"></div>
						</div>
						<h2 class="text-4xl sm:text-5xl font-bold {colors.text} capitalize tracking-tight mb-3">
							{cat}
						</h2>
						<p class="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
							Discover our carefully curated selection of {cat.toLowerCase()}
						</p>
					</div>
					
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{#each groupedProducts[cat] as product, index}
							<div 
								class="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border {colors.border} animate-fade-in-up"
								style="animation-delay: {index * 100}ms"
							>
								<div class="relative overflow-hidden">
									<img
										src={product.image_url || '/placeholder.svg?height=200&width=300&query=delicious food dish'}
										alt={product.name}
										class="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									<div class="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
										<span class="text-sm">❤️</span>
									</div>
								</div>
								
								<div class="p-6 bg-gradient-to-b from-white to-gray-50/50">
									<h3 class="text-xl font-bold text-gray-900 group-hover:{colors.text} transition-colors duration-300 mb-2 leading-tight">
										{product.name}
									</h3>
									<p class="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
										{product.description}
									</p>
									<div class="flex items-center justify-between">
										<span class="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
											{product.price} €
										</span>
										<button class="px-4 py-2 bg-gradient-to-r {colors.bg} text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:shadow-lg">
											Add to Order
										</button>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}
		{/each}

		{#if !hasProducts}
			<div class="text-center py-20">
				<div class="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center">
					<span class="text-3xl">🍽️</span>
				</div>
				<p class="text-xl text-gray-600 font-medium animate-fade-in">
					No products available at the moment.
				</p>
				<p class="text-gray-500 mt-2">Check back soon for our delicious offerings!</p>
			</div>
		{/if}
	</div>

	<footer class="relative bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-16 overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-amber-900/20"></div>
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
			<div class="text-center">
				<h3 class="text-3xl font-bold mb-4 bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
					Strandbar Ada
				</h3>
				<div class="w-20 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full mx-auto mb-6"></div>
				<p class="text-lg font-medium mb-2">© 2025 Strandbar Ada</p>
				<p class="text-gray-400 max-w-md mx-auto leading-relaxed">
					Where vibrant flavors meet unforgettable moments. Experience culinary excellence by the shore.
				</p>
				<div class="mt-8 flex justify-center gap-6">
					<div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
						<span class="text-sm">📧</span>
					</div>
					<div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
						<span class="text-sm">📱</span>
					</div>
					<div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
						<span class="text-sm">📍</span>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	@keyframes fade-in-down {
		0% { opacity: 0; transform: translateY(-30px); }
		100% { opacity: 1; transform: translateY(0); }
	}
	@keyframes fade-in-up {
		0% { opacity: 0; transform: translateY(30px); }
		100% { opacity: 1; transform: translateY(0); }
	}
	@keyframes blob {
		0% { transform: translate(0px, 0px) scale(1); }
		33% { transform: translate(30px, -50px) scale(1.1); }
		66% { transform: translate(-20px, 20px) scale(0.9); }
		100% { transform: translate(0px, 0px) scale(1); }
	}
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}
	
	.animate-fade-in-down {
		animation: fade-in-down 0.8s ease-out;
	}
	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out;
	}
	.animate-fade-in {
		animation: fade-in-up 0.6s ease-out;
	}
	.animate-blob {
		animation: blob 7s infinite;
	}
	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
	
	.animation-delay-500 {
		animation-delay: 0.5s;
	}
	.animation-delay-1000 {
		animation-delay: 1s;
	}
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	.animation-delay-4000 {
		animation-delay: 4s;
	}
	
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
