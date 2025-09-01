<script>
	import { enhance } from '$app/forms';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';

	let open = $state(false);

	let formData = $state({
		name: '',
		description: '',
		price: '',
		category: '',
		image: null
	});

	function handleFileChange(event) {
		formData.image = event.target.files[0];
	}

	function resetForm() {
		formData = {
			name: '',
			description: '',
			price: '',
			category: '',
			image: null
		};
	}

	const categoryOptions = [
		{ value: 'drink', label: 'Drink' },
		{ value: 'cocktail', label: 'Cocktail' },
		{ value: 'food', label: 'Food' },
		{ value: 'snack', label: 'Snack' },
		{ value: 'other', label: 'Other' }
	];

	const selectedCategoryLabel = $derived(
		categoryOptions.find((option) => option.value === formData.category)?.label ??
			'Kategorie auswählen'
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
	>
		Neues Produkt erstellen
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Neues Produkt erstellen</Dialog.Title>
			<Dialog.Description>Geben Sie die Details für das neue Produkt ein.</Dialog.Description>
		</Dialog.Header>
		<form
			action="?/create"
			method="POST"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						open = false;
						resetForm();
					}
					await update();
				};
			}}
			class="space-y-4"
			enctype="multipart/form-data"
		>
			<div class="space-y-2">
				<Label for="name">Name</Label>
				<Input id="name" name="name" bind:value={formData.name} required />
			</div>
			<div class="space-y-2">
				<Label for="description">Beschreibung</Label>
				<Input id="description" name="description" bind:value={formData.description} required />
			</div>
			<div class="space-y-2">
				<Label for="price">Preis</Label>
				<Input
					id="price"
					name="price"
					type="number"
					step="0.01"
					bind:value={formData.price}
					required
				/>
			</div>
			<div class="space-y-2">
				<Label for="category">Kategorie</Label>
				<Select.Root type="single" bind:value={formData.category} name="category">
					<Select.Trigger class="w-full">
						{selectedCategoryLabel}
					</Select.Trigger>
					<Select.Content>
						{#each categoryOptions as option (option.value)}
							<Select.Item value={option.value} label={option.label}>
								{option.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="category" value={formData.category} />
			</div>
			<div class="space-y-2">
				<Label for="image">Bild (optional)</Label>
				<Input id="image" name="image" type="file" accept="image/*" on:change={handleFileChange} />
			</div>
			<Dialog.Footer>
				<Button type="submit">Erstellen</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
