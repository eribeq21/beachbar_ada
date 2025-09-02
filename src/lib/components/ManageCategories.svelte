<script>
	import { enhance } from '$app/forms';

	let { categories } = $props();
	let createOpen = $state(false);
	let deleteCatId = $state(null);
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-xl font-semibold text-gray-900">Kategorien verwalten</h2>
		<button
			onclick={() => (createOpen = true)}
			class="rounded-md bg-green-600 px-4 py-2 text-white shadow-sm transition hover:bg-green-700"
		>
			Neue Kategorie
		</button>
	</div>

	<ul class="space-y-3">
		{#each categories as cat}
			<li class="flex items-center justify-between rounded-md bg-gray-50 p-3">
				<span class="text-gray-900">{cat.name}</span>
				<button
					class="text-red-600 transition hover:text-red-800"
					onclick={() => (deleteCatId = cat.id)}
				>
					Löschen
				</button>
			</li>
		{/each}
	</ul>

	{#if categories.length === 0}
		<p class="mt-4 text-center text-gray-500 italic">Keine Kategorien vorhanden.</p>
	{/if}
</div>

<!-- Create Category Dialog -->
{#if createOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="mb-4 text-lg font-semibold text-gray-900">Neue Kategorie erstellen</h3>
			<form
				action="?/createCategory"
				method="POST"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'success') {
							createOpen = false;
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
				</div>
				<div class="mt-6 flex justify-end space-x-3">
					<button
						type="button"
						onclick={() => (createOpen = false)}
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

<!-- Delete Category Confirmation -->
{#if deleteCatId}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="mb-2 text-lg font-semibold text-gray-900">Kategorie löschen?</h3>
			<p class="mb-6 text-gray-600">
				Diese Aktion löscht die Kategorie und alle zugehörigen Produkte dauerhaft.
			</p>
			<div class="flex justify-end space-x-3">
				<button
					class="rounded-md border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50"
					onclick={() => (deleteCatId = null)}
				>
					Abbrechen
				</button>
				<form
					action="?/deleteCategory"
					method="POST"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								deleteCatId = null;
							}
							await update();
						};
					}}
					class="inline"
				>
					<input type="hidden" name="id" value={deleteCatId} />
					<button
						type="submit"
						class="rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
					>
						Löschen
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
