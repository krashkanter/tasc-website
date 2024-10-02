<script lang="ts">
	import ThemeToggle from '$lib/components/HeaderFooter/ThemeToggle.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	function getHeading() {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		if (segments.length > 0) {
			const name = adminItems.find((item) => item.link === '/' + segments[1])?.name;
			return name;
		}
		return 'Dashboard';
	}

	let adminItems = [
		{
			name: 'Events',
			link: '/events'
		},
		{
			name: 'Users',
			link: '/users'
		}
	];
</script>

<section class="flex flex-row">
	<div class="h-screen w-72 overflow-y-auto border-r-2 border-slate-400 dark:border-slate-700">
		<a href={'/admin'} class="block w-full p-4 text-center hover:bg-slate-300 dark:hover:bg-slate-700">Dashboard</a>
		<Separator />

		{#each adminItems as item}
			<a href={'/admin' + item.link} class="block w-full p-4 text-center hover:bg-slate-300 dark:hover:bg-slate-700">{item.name}</a>
		{/each}

		<Separator />
		<div class="flex w-full justify-center p-2">
			<ThemeToggle />
		</div>
		<Separator />
	</div>
	<div class="w-full p-4">
		{#if !$page.url.pathname.endsWith('admin')}
			<div class="flex flex-row border-b-2 pb-4">
				<button
					on:click={() => {
						const segments = $page.url.pathname.split('/').filter(Boolean);
						segments.pop();
						const newPath = '/' + segments.join('/');
						goto(newPath);
					}}
				>
					<svg class="size-10" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="white" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64" /><path fill="white" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z" /></svg>
				</button>
				<div class="flex h-full w-full justify-center text-2xl font-semibold">
					<header>{getHeading()}</header>
				</div>
			</div>
		{/if}
		<div class="w-full h-[88vh]">
			<slot />
		</div>
	</div>
</section>
