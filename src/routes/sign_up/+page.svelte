<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
	<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-bold">Register</h1>

		<form action="?/register" method="POST" use:enhance class="space-y-4">
			<div class="space-y-1">
				<label for="email" class="block text-sm font-medium text-gray-700">E-Mail</label>
				<input
					type="text"
					name="email"
					id="email"
					required
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
				/>
			</div>

			<div class="space-y-1">
				<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					required
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
				/>
			</div>

			<div class="space-y-1">
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
				/>
			</div>

			<button
				type="submit"
				class="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
			>
				Register
			</button>

			<p class="text-center text-sm text-gray-600">
				Already have an account?
				<a href="/login" class="text-blue-600 hover:underline">Login</a>
			</p>
		</form>

		{#if form?.message}
			<p class="mt-4 text-center text-sm text-red-600">{form.message}</p>
		{/if}
	</div>
</div>
