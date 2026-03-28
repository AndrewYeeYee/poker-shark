<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="flex flex-col items-center py-12 text-center">
	<h1 class="text-5xl font-extrabold text-accent">Poker Shark</h1>
	<p class="mt-3 text-lg text-gray-400">Train your preflop hand ranges for 9-max Texas Hold'em</p>

	<a
		href="{base}/quiz"
		class="mt-8 inline-block rounded-xl bg-green-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-colors hover:bg-green-500"
	>
		Start Training
	</a>

	<div class="mt-12 grid w-full max-w-lg gap-4 sm:grid-cols-3">
		<a
			href="{base}/quiz"
			class="rounded-xl border border-surface-lighter bg-surface-light p-6 text-center transition-colors hover:border-accent/50"
		>
			<div class="text-2xl">&#127183;</div>
			<div class="mt-2 font-semibold text-white">Quiz</div>
			<p class="mt-1 text-sm text-gray-400">Test your range knowledge</p>
		</a>
		<a
			href="{base}/ranges"
			class="rounded-xl border border-surface-lighter bg-surface-light p-6 text-center transition-colors hover:border-accent/50"
		>
			<div class="text-2xl">&#128202;</div>
			<div class="mt-2 font-semibold text-white">Ranges</div>
			<p class="mt-1 text-sm text-gray-400">View and edit hand ranges</p>
		</a>
		<a
			href="{base}/stats"
			class="rounded-xl border border-surface-lighter bg-surface-light p-6 text-center transition-colors hover:border-accent/50"
		>
			<div class="text-2xl">&#128200;</div>
			<div class="mt-2 font-semibold text-white">Stats</div>
			<p class="mt-1 text-sm text-gray-400">Track your progress</p>
		</a>
	</div>
</div>
