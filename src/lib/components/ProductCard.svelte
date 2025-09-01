<script>
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger
	} from '$lib/components/ui/alert-dialog';
	import { enhance } from '$app/forms';
	import EditProductDialog from './EditProductDialog.svelte';
	import { Edit } from 'lucide';

	let { product } = $props();
	let open = $state(false);
</script>

<Card class="overflow-hidden">
	<CardHeader class="p-0">
		<img
			src={product.image_url || '/placeholder.svg'}
			alt={product.name}
			class="h-48 w-full object-cover"
		/>
	</CardHeader>
	<CardContent class="pt-4">
		<CardTitle>{product.name}</CardTitle>
		<CardDescription class="line-clamp-2">{product.description}</CardDescription>
	</CardContent>
	<CardFooter class="flex justify-between">
		<span class="font-semibold text-primary">{product.price} €</span>
		<div class="space-x-2">
			<Button variant="outline" size="sm" onclick={() => (open = true)}>Bearbeiten</Button>
			<AlertDialog>
				<AlertDialogTrigger>Löschen</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Produkt löschen?</AlertDialogTitle>
						<AlertDialogDescription>
							Diese Aktion kann nicht rückgängig gemacht werden. Das Produkt wird dauerhaft
							gelöscht.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Abbrechen</AlertDialogCancel>
						<form action="?/delete" method="POST" use:enhance>
							<input type="hidden" name="id" value={product.id} />
							<AlertDialogAction type="submit">Löschen</AlertDialogAction>
						</form>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	</CardFooter>
</Card>

<EditProductDialog {product} bind:open />
