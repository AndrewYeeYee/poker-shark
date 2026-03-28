<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	const links = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/quiz`, label: 'Quiz' },
		{ href: `${base}/ranges`, label: 'Ranges' },
		{ href: `${base}/stats`, label: 'Stats' }
	];
</script>

<nav class="border-b border-surface-lighter bg-surface-light">
	<div class="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
		<a href="{base}/" class="text-lg font-bold text-accent">Poker Shark</a>
		<div class="flex gap-1">
			{#each links as link}
				<a
					href={link.href}
					class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
						{page.url.pathname === link.href ||
					(link.href !== `${base}/` && page.url.pathname.startsWith(link.href))
						? 'bg-surface-lighter text-white'
						: 'text-gray-400 hover:text-gray-200'}"
				>
					{link.label}
				</a>
			{/each}
		</div>
	</div>
</nav>
