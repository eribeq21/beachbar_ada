<script>
	import { enhance } from '$app/forms';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';

	let { open = $bindable(), product } = $props();

	let formData = $state({
		id: '',
		name: '',
		description: '',
		price: '',
		category: '',
		image: null
	});

	$effect(() => {
		if (product) {
			formData = {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price.toString(),
				category: product.category,
				image: null
			};
		}
	});

	function handleFileChange(event) {
		formData.image = event.target.files[0];
	}

	function resetForm() {
		formData = {
			id: '',
			name: '',
			description: '',
			price: '',
			category: '',
			image: null
		};
	}

	// Category options
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

<Dialog bind:open onClose={resetForm}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Produkt bearbeiten</DialogTitle>
			<DialogDescription>Ändern Sie die Details des Produkts.</DialogDescription>
		</DialogHeader>
		<form
			action="?/update"
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
			<input type="hidden" name="id" value={formData.id} />
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
				<Select.Root bind:value={formData.category} name="category">
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
				<Label for="image">Neues Bild (optional)</Label>
				<Input id="image" name="image" type="file" accept="image/*" on:change={handleFileChange} />
			</div>
			<DialogFooter>
				<Button type="submit">Speichern</Button>
			</DialogFooter>
		</form>
	</DialogContent>
</Dialog>
