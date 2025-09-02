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
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<header class="mb-12 text-center">
		<h1 class="text-4xl font-bold text-gray-900">Strandbar Ada - Menü</h1>
		<p class="mt-2 text-gray-600">Willkommen! Hier ist unser aktuelles Angebot.</p>
	</header>

	{#each categories as cat}
		{#if groupedProducts[cat].length > 0}
			<section class="mb-12">
				<h2 class="mb-6 text-2xl font-semibold capitalize">{cat}</h2>
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{#each groupedProducts[cat] as product}
						<div class="overflow-hidden rounded-lg bg-white shadow-md">
							<img
								src={product.image_url || '/placeholder.svg'}
								alt={product.name}
								class="h-48 w-full object-cover"
							/>
							<div class="p-4">
								<h3 class="text-lg font-semibold text-gray-900">{product.name}</h3>
								<p class="mt-1 line-clamp-2 text-sm text-gray-600">
									{product.description}
								</p>
								<span class="mt-2 block font-semibold text-blue-600">{product.price} €</span>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}
	{/each}

	{#if !hasProducts}
		<p class="text-center text-gray-500 italic">Zurzeit keine verfügbaren Produkte.</p>
	{/if}
</div>
