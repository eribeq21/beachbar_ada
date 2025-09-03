<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center px-4 py-8">
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-gentle-float"></div>
		<div class="absolute bottom-32 right-16 w-24 h-24 bg-accent/5 rounded-full animate-gentle-float" style="animation-delay: 1s;"></div>
		<div class="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/3 rounded-full animate-gentle-float" style="animation-delay: 2s;"></div>
	</div>

	<div class="relative w-full max-w-md">
		<div class="bg-card/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border/20 animate-warm-glow">
			<div class="text-center mb-8">
				<h1 class="font-serif font-black text-3xl text-primary mb-2 tracking-tight">Strandbar Ada</h1>
				<p class="text-muted-foreground text-sm font-medium">Member Portal</p>
				<div class="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-3"></div>
			</div>

			<form action="?/login" method="POST" use:enhance class="space-y-6">
				<div class="space-y-2">
					<label for="email" class="block text-sm font-semibold text-foreground tracking-wide">
						Email Address
					</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						class="w-full rounded-lg border-2 border-border bg-input px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none hover:border-primary/50"
						placeholder="your@email.com"
					/>
				</div>

				<div class="space-y-2">
					<label for="password" class="block text-sm font-semibold text-foreground tracking-wide">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						class="w-full rounded-lg border-2 border-border bg-input px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none hover:border-primary/50"
						placeholder="Enter your password"
					/>
				</div>

				<button
					type="submit"
					class="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:ring-4 focus:ring-ring focus:outline-none active:scale-[0.98]"
				>
					Sign In to Your Account
				</button>

				<div class="text-center pt-4">
					<p class="text-sm text-muted-foreground">
						New to Strandbar Ada?
						<a 
							href="/sign_up" 
							class="font-semibold text-black hover:text-gray-700 transition-colors duration-200 ml-1 hover:underline"
						>
							Create Account
						</a>
					</p>
				</div>
			</form>

			{#if form?.message}
				<div class="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
					<p class="text-sm text-destructive font-medium text-center">{form.message}</p>
				</div>
			{/if}
		</div>

		<div class="text-center mt-6">
			<p class="text-xs text-muted-foreground/70">
				© 2024 Strandbar Ada • Premium Beachside Dining
			</p>
		</div>
	</div>
</div>
