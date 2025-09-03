<script>
	import { enhance } from '$app/forms';
</script>

<aside
	class="fixed top-0 left-0 z-50 flex h-full min-h-screen w-64 flex-col bg-gradient-to-b from-amber-50 to-white-50 text-amber-900 shadow-2xl border-r border-amber-200/50"
>
	<div class="border-b border-amber-200/30 p-6 bg-gradient-to-r from-amber-100/50 to-orange-100/30">
		<h1 class="text-2xl font-black tracking-tight text-amber-800">
			Admin Panel
		</h1>
		<div class="mt-1 text-sm font-medium text-amber-600/80">Strandbar Ada</div>
	</div>

	<nav class="flex-1 p-6">
		<ul class="space-y-2">
			<li>
				<a 
					href="/admin/kategorien" 
					class="group flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:bg-amber-100/60 hover:text-amber-800 hover:shadow-sm active:scale-[0.98]"
				>
					<div class="mr-3 h-2 w-2 rounded-full bg-amber-400/60 transition-colors group-hover:bg-amber-500"></div>
					Kategorien
				</a>
			</li>
			<li>
				<a 
					href="/admin/produkten" 
					class="group flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:bg-amber-100/60 hover:text-amber-800 hover:shadow-sm active:scale-[0.98]"
				>
					<div class="mr-3 h-2 w-2 rounded-full bg-amber-400/60 transition-colors group-hover:bg-amber-500"></div>
					Produkten
				</a>
			</li>
		</ul>
	</nav>

	<div class="border-t border-amber-200/30 p-6 bg-gradient-to-r from-amber-50/50 to-orange-50/30">
		<form action="/logout?/logout" method="POST" use:enhance>
			<button
				type="submit"
				class="w-full rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-red-600 hover:to-red-700 hover:shadow-xl active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500/50"
			>
				Logout
			</button>
		</form>
	</div>
</aside>
