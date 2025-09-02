<script>
	import AdminNav from '$lib/components/AdminNav.svelte';
	import { enhance } from '$app/forms';

	let { data } = $props();
	let categories = $state(data.categories);
	let createOpen = $state(false);
	let deleteCatId = $state(null);

	$effect(() => {
		categories = data.categories;
	});
</script>

<div class="min-h-screen bg-white">
	<AdminNav />

	<main class="mx-auto max-w-6xl space-y-6 p-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-800">Kategorienverwaltung</h1>
			<button
				onclick={() => (createOpen = true)}
				class="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition hover:bg-blue-700"
			>
				Neue Kategorie
			</button>
		</div>

		<ul class="space-y-2">
			{#each categories as cat}
				<li
					class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
				>
					<span class="text-sm text-gray-800">{cat.name}</span>
					<button
						class="text-sm text-red-500 transition hover:text-red-600"
						onclick={() => (deleteCatId = cat.id)}
					>
						Löschen
					</button>
				</li>
			{/each}
		</ul>

		{#if categories.length === 0}
			<p class="text-center text-sm text-gray-400 italic">Keine Kategorien vorhanden.</p>
		{/if}
	</main>
</div>

{#if createOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
			<h3 class="mb-3 text-base font-medium text-gray-800">Neue Kategorie erstellen</h3>
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
				<div class="space-y-3">
					<div>
						<label for="name" class="block text-xs font-medium text-gray-700">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							class="mt-1 block w-full rounded-lg border border-gray-200 px-2 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>
				</div>
				<div class="mt-4 flex justify-end space-x-2">
					<button
						type="button"
						onclick={() => (createOpen = false)}
						class="rounded border border-gray-200 px-3 py-1 text-xs transition hover:bg-gray-50"
					>
						Abbrechen
					</button>
					<button
						type="submit"
						class="rounded bg-blue-600 px-3 py-1 text-xs text-white transition hover:bg-blue-700"
					>
						Erstellen
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

{#if deleteCatId}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
			<h3 class="mb-2 text-base font-medium text-gray-800">Kategorie löschen?</h3>
			<p class="mb-4 text-sm text-gray-500">
				Diese Aktion löscht die Kategorie und alle zugehörigen Produkte.
			</p>
			<div class="flex justify-end space-x-2">
				<button
					class="rounded border border-gray-200 px-3 py-1 text-xs transition hover:bg-gray-50"
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
						class="rounded bg-red-500 px-3 py-1 text-xs text-white transition hover:bg-red-600"
					>
						Löschen
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
