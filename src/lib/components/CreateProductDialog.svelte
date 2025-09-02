<script>
	import { enhance } from '$app/forms';

	let { categories } = $props();
	let open = $state(false);
</script>

<button
	onclick={() => (open = true)}
	class="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700"
>
	Neues Produkt erstellen
</button>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="mb-4 text-lg font-semibold text-gray-900">Neues Produkt erstellen</h3>
			<form
				action="?/create"
				method="POST"
				enctype="multipart/form-data"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'success') {
							open = false;
						}
						await update();
					};
				}}
			>
				<div class="space-y-4">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>
					<div>
						<label for="description" class="block text-sm font-medium text-gray-700"
							>Beschreibung</label
						>
						<textarea
							id="description"
							name="description"
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
						></textarea>
					</div>
					<div>
						<label for="price" class="block text-sm font-medium text-gray-700">Preis (€)</label>
						<input
							type="number"
							step="0.01"
							id="price"
							name="price"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>
					<div>
						<label for="category_id" class="block text-sm font-medium text-gray-700"
							>Kategorie</label
						>
						<select
							id="category_id"
							name="category_id"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
						>
							{#each categories as cat}
								<option value={cat.id}
									>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</option
								>
							{/each}
						</select>
					</div>
					<div>
						<label for="available" class="flex items-center">
							<input
								type="checkbox"
								id="available"
								name="available"
								checked
								class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span class="text-sm font-medium text-gray-700">Verfügbar</span>
						</label>
					</div>
					<div>
						<label for="image" class="block text-sm font-medium text-gray-700">Bild</label>
						<input
							type="file"
							id="image"
							name="image"
							accept="image/*"
							class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
						/>
					</div>
				</div>
				<div class="mt-6 flex justify-end space-x-3">
					<button
						type="button"
						onclick={() => (open = false)}
						class="rounded-md border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50"
					>
						Abbrechen
					</button>
					<button
						type="submit"
						class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
					>
						Erstellen
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
