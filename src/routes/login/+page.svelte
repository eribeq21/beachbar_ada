<!-- routes/login/+page.svelte -->
<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	let { form } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle class="text-2xl font-bold">Login</CardTitle>
		</CardHeader>
		<CardContent>
			<form action="?/login" method="POST" use:enhance class="space-y-4">
				<div class="space-y-2">
					<Label for="email">E-Mail</Label>
					<Input type="text" name="email" id="email" required />
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input type="password" name="password" id="password" required />
				</div>
				<Button type="submit" class="w-full" variant="default">Login</Button>
				<p class="text-center text-sm text-muted-foreground">
					No account? <a href="/sign_up" class="text-primary hover:underline">Create one</a>
				</p>
			</form>
			{#if form?.message}
				<p class="mt-4 text-center text-sm text-destructive">{form.message}</p>
			{/if}
		</CardContent>
	</Card>
</div>
