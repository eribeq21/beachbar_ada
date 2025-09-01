<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
	<form
		action="?/register"
		method="POST"
		use:enhance
		class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
	>
		<h1 class="text-2xl font-bold text-gray-800 mb-4">Register</h1>

		<label for="email" class="block text-gray-700">E-Mail</label>
		<input
			type="text"
			name="email"
			id="email"
			required
			class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
		/>

		<label for="username" class="block text-gray-700">Username</label>
		<input
			type="text"
			name="username"
			id="username"
			required
			class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
		/>

		<label for="password" class="block text-gray-700">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			required
			class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
		/>

		<button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
			>Register</button
		>
		<p>Already have an account? <a href="/login" class="text-blue-500">Login</a></p>

		
	</form>
</div>