<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import EditProductDialog from './EditProductDialog.svelte';

	let { product, categories } = $props();
	let editOpen = $state(false);
	let deleteOpen = $state(false);
	let localAvailable = $state(product.available);
</script>

<div
	class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
>
	<img
		src={product.image_url || '/placeholder.svg'}
		alt={product.name}
		class="h-40 w-full object-cover"
	/>

	<div class="p-4">
		<h3 class="text-base font-medium text-gray-800">{product.name}</h3>
		<p class="mt-1 line-clamp-2 text-xs text-gray-500">{product.description}</p>
	</div>

	<div class="  border-t border-gray-100 p-3">
		<div class="flex items-center justify-between gap-4">
			<span class="min-w-[60px] text-sm font-medium text-blue-600">{product.price} €</span>
			<form
				action="?/toggle"
				method="POST"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'success') {
							localAvailable = !localAvailable;
						}
						await update();
					};
				}}
				class="flex items-center justify-center"
			>
				<input type="hidden" name="id" value={product.id} />
				<button
					type="submit"
					class="relative inline-flex cursor-pointer items-center"
					aria-label={localAvailable ? 'Als nicht verfügbar markieren' : 'Als verfügbar markieren'}
				>
					<div
						class="h-5 w-10 rounded-full transition-colors duration-200 ease-in-out"
						class:bg-green-400={localAvailable}
						class:bg-gray-300={!localAvailable}
					>
						<div
							class="h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out"
							class:translate-x-5={localAvailable}
							class:translate-x-1={!localAvailable}
						></div>
					</div>
				</button>
			</form>
			<div class="flex items-center gap-2">
				<button
					class="rounded border border-gray-200 px-2 py-1 text-xs transition hover:bg-gray-50"
					onclick={() => (editOpen = true)}
				>
					Bearbeiten
				</button>
				<button
					class="rounded bg-red-500 px-2 py-1 text-xs text-white transition hover:bg-red-600"
					onclick={() => (deleteOpen = true)}
				>
					Löschen
				</button>
			</div>
		</div>
	</div>
</div>

{#if deleteOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
			<h3 class="mb-2 text-base font-medium text-gray-800">Produkt löschen?</h3>
			<p class="mb-4 text-sm text-gray-500">Diese Aktion kann nicht rückgängig gemacht werden.</p>
			<div class="flex justify-end space-x-2">
				<button
					class="rounded border border-gray-200 px-3 py-1 text-xs transition hover:bg-gray-50"
					onclick={() => (deleteOpen = false)}
				>
					Abbrechen
				</button>
				<form
					action="?/delete"
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								deleteOpen = false;
							}
						};
					}}
					class="inline"
				>
					<input type="hidden" name="id" value={product.id} />
					<button
						type="submit"
						class="rounded bg-red-500 px-3 py-1 text-xs text-white transition hover:bg-red-600"
					>
						Löschen
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<EditProductDialog {product} bind:open={editOpen} {categories} />
