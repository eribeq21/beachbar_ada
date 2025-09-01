<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	import CreateProductDialog from '$lib/components/CreateProductDialog.svelte';

	let { data, form } = $props();

	let products = $state(data.products);

	$effect(() => {
		products = data.products;
	});
</script>

<CreateProductDialog />

{#if products.length > 0}
	<div class="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3">
		{#each products as product}
			<ProductCard {product} />
		{/each}
	</div>
{:else}
	<p class="mt-4 text-gray-500 italic">Keine Produkte gefunden.</p>
{/if}
