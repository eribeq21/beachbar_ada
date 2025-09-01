<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children , data } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if data.user}
<nav class="w-full bg-gray-900 text-white flex items-center justify-between px-6 py-3 shadow-md">
  <div class="font-bold text-lg">Beachbar Ada</div>
  <form action="/logout?/logout" method="POST">
    <button type="submit" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
  </form>
</nav>
{/if}

{@render children?.()}
