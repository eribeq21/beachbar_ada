<script>
	import { enhance } from '$app/forms';
    let { form } = $props();
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
	>
		<h1 class="text-2xl font-bold text-gray-800 mb-4">Login</h1>

		<label for="email" class="block text-gray-700">E-Mail</label>
		<input
			type="text"
			name="email"
			id="email"
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


		<button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
			>Login</button
		>

		<p>No account? <a href="/sign_up" class="text-blue-500">Create one</a></p>

	</form>
    {#if form}
      <h1>{form.message}</h1>
    {/if}
</div>