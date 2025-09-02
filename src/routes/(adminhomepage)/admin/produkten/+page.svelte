<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	import CreateProductDialog from '$lib/components/CreateProductDialog.svelte';

	let { data } = $props();

	let products = $state(data.products);
	let categories = $state(data.categories);
	let searchQuery = $state('');
	let selectedCategory = $state('all');

	$effect(() => {
		products = data.products;
		categories = data.categories;
	});

	// Products grouped by category, filtered
	let groupedProducts = $derived(
		categories.reduce((acc, cat) => {
			acc[cat.name] = products.filter(
				(p) =>
					p.category_id === cat.id &&
					(selectedCategory === 'all' || p.category_id === +selectedCategory) &&
					p.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
			return acc;
		}, {})
	);

	// Check if there are products after filtering
	let hasProducts = $derived(
		products.some(
			(p) =>
				(selectedCategory === 'all' || p.category_id === +selectedCategory) &&
				p.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<div class="min-h-screen bg-white">
	<main class="space-y-6">
		<nav
			class="flex w-full flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-2"
		>
			<!-- Left section -->
			<div class="flex flex-wrap items-center gap-2">
				<h1 class="text-xl font-semibold text-gray-800">Produktverwaltung</h1>

				<!-- Search input -->
				<input
					type="text"
					placeholder="Produkte suchen..."
					bind:value={searchQuery}
					class="w-40 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
				/>

				<!-- Category select -->
				<select
					bind:value={selectedCategory}
					class="w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
				>
					<option value="all">Alle Kategorien</option>
					{#each categories as cat}
						<option value={cat.id}>
							{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
						</option>
					{/each}
				</select>
			</div>

			<!-- Right section -->
			<div>
				<CreateProductDialog {categories} />
			</div>
		</nav>

		{#each categories as cat}
			{#if groupedProducts[cat.name].length > 0}
				<section class="mb-6 p-6">
					<h2 class="mb-3 text-lg font-medium text-gray-800">
						{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
					</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{#each groupedProducts[cat.name] as product}
							<ProductCard {product} {categories} />
						{/each}
					</div>
				</section>
			{/if}
		{/each}

		{#if !hasProducts}
			<p class="text-center text-sm text-gray-400 italic">Keine Produkte gefunden.</p>
		{/if}
	</main>
</div>
