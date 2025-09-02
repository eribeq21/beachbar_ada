<script>
	import { enhance } from '$app/forms';
</script>

<aside
	class="fixed top-0 left-0 z-50 flex h-full min-h-screen w-64 flex-col bg-gray-800 text-white shadow-lg"
>
	<!-- Title -->
	<div class="border-b border-gray-700 p-3.5 text-xl font-bold">Admin Panel</div>

	<!-- Navigation Links -->
	<nav class="flex-1 p-4">
		<ul class="space-y-3">
			<li>
				<a href="/admin/kategorien" class="block rounded-lg px-3 py-2 transition hover:bg-gray-700">
					Kategorien
				</a>
			</li>
			<li>
				<a href="/admin/produkten" class="block rounded-lg px-3 py-2 transition hover:bg-gray-700">
					Produkten
				</a>
			</li>
		</ul>
	</nav>

	<!-- Logout Button at Bottom -->
	<div class="border-t border-gray-700 p-4">
		<form action="/logout" method="POST" use:enhance>
			<button
				type="submit"
				class="w-full rounded-lg bg-red-600 px-3 py-2 transition hover:bg-red-700"
			>
				Logout
			</button>
		</form>
	</div>
</aside>
