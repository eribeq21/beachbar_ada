<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if data.user}
	<nav class="flex w-full items-center justify-between bg-gray-900 px-6 py-3 text-white shadow-md">
		<div class="text-lg font-bold">Beachbar Ada</div>
		<form action="/logout?/logout" method="POST">
			<button type="submit" class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
				>Logout</button
			>
		</form>
	</nav>
{/if}

{@render children?.()}
