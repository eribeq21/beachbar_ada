<script>
	let { children } = $props();
	import AdminNav from '$lib/components/AdminNav.svelte';
</script>

<div class="flex">
	<AdminNav />
	<main class="ml-64 flex-1">
		{@render children()}
	</main>
</div>
