<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center px-4 py-8 relative overflow-hidden">
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-xl animate-float"></div>
		<div class="absolute bottom-32 right-16 w-24 h-24 bg-orange-200/20 rounded-full blur-xl animate-float-delayed"></div>
		<div class="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200/20 rounded-full blur-lg animate-pulse"></div>
	</div>

	<div class="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100/50 p-8 relative z-10">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-black text-primary mb-2 font-heading">Join Strandbar Ada</h1>
			<p class="text-muted-foreground font-body">Create your account to start your culinary journey</p>
		</div>

		<form action="?/register" method="POST" use:enhance class="space-y-6">
			<div class="space-y-2">
				<label for="email" class="block text-sm font-semibold text-foreground font-body">Email Address</label>
				<input
					type="email"
					name="email"
					id="email"
					required
					class="w-full rounded-xl border-2 border-border bg-background/50 px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-primary/50"
					placeholder="your@email.com"
				/>
			</div>

			<div class="space-y-2">
				<label for="username" class="block text-sm font-semibold text-foreground font-body">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					required
					class="w-full rounded-xl border-2 border-border bg-background/50 px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-primary/50"
					placeholder="Choose a username"
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="block text-sm font-semibold text-foreground font-body">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					class="w-full rounded-xl border-2 border-border bg-background/50 px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-primary/50"
					placeholder="Create a secure password"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30 font-body"
			>
				Create Account
			</button>

			<p class="text-center text-sm text-muted-foreground font-body">
				Already have an account?
				<a href="/login" class="text-black hover:text-gray-700 font-semibold hover:underline transition-colors duration-200">
					Sign In
				</a>
			</p>
		</form>

		{#if form?.message}
			<div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
				<p class="text-center text-sm text-red-600 font-body">{form.message}</p>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(180deg); }
	}
	
	@keyframes float-delayed {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-15px) rotate(-180deg); }
	}
	
	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
	
	.animate-float-delayed {
		animation: float-delayed 8s ease-in-out infinite 2s;
	}
</style>
