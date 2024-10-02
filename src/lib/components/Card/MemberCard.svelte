<script lang="ts">
	export let image: string;
	export let imageAlt: string = 'profile';
	export let name: string | null;
	export let post: string;
	export let quote: string | null = '';
	export let target: string = '_blank';
	export let github: string | null | undefined = null;
	export let linkedin: string | null | undefined = null;
	export let instagram: string | null | undefined = null;
	// export let email: string | null = null;

	export let lazy: boolean;
	let src = lazy ? '' : image;
	let observer: IntersectionObserver | null = null;

	import lazyLoad from './lazyLoad';

	if (typeof window !== 'undefined') {
		if (lazy) {
			src = '';
			observer = new IntersectionObserver(onIntersect, { rootMargin: '200px' });
		}
	}

	function onIntersect(
		entries: {
			isIntersecting: boolean;
			target: Element;
		}[]
	) {
		if (!src && entries[0].isIntersecting) {
			observer!.unobserve(entries[0].target);
			src = image;
		}
	}

	let display: 'none' | 'block' | 'flex' = 'none';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click|preventDefault={() => {
		display = 'block';
	}}
	class="dark:custom-shadow-black w-72 cursor-pointer overflow-hidden rounded-lg border bg-card py-5 shadow-xl duration-300 ease-in-out hover:scale-110"
>
	<div class="mx-14 flex items-center justify-center">
		<!-- w-32 h-32 -->
		<img {src} alt={imageAlt} class="aspect-square w-full rounded-full border border-border object-cover place-content-center" use:lazyLoad={observer} />
	</div>
	<div class="flex flex-col items-center justify-center">
		<h1 class="pt-4 text-xl font-bold">{name}</h1>
		<h2 class="p-2 text-lg font-medium text-zinc-600 dark:text-slate-400 text-center">{post}</h2>

		<!-- <div on:click|stopPropagation={() => {}} class="flex gap-5 py-2">
			{#if instagram}
				<a href={instagram} {target}>
					<iconify-icon icon="mdi:instagram" height="2.5rem" />
				</a>
			{/if}
			{#if github}
				<a href={github} {target}>
					<iconify-icon icon="mdi:github" height="2.5rem" />
				</a>
			{/if}
			{#if linkedin}
				<a href={linkedin} {target}>
					<iconify-icon icon="mdi:linkedin" height="2.5rem" />
				</a>
			{/if}
		</div> -->
	</div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click|preventDefault={() => {
		display = 'none';
		console.log('close popup');
	}}
	style="display: {display};"
	class="fixed top-0 z-10 h-screen w-full duration-300"
>
	<div on:click|preventDefault|stopPropagation={() => {}} class="card dark:custom-shadow-black fixed inset-0 top-[20%] z-20 mx-auto flex min-h-max w-[80%] cursor-pointer flex-col items-center overflow-hidden rounded-lg border border-border bg-popover shadow-lg md:min-h-fit md:w-1/2 lg:w-1/4">
		<div class="flex items-center justify-center p-5" use:lazyLoad={observer}>
			<img {src} alt={imageAlt} class="w-full border border-border object-cover md:h-64 md:w-64" />
		</div>
		<div class="flex flex-col items-center justify-center">
			<h1 class="pt-4 text-2xl font-bold">{name}</h1>
			<h2 class="p-2 text-base font-medium">{post}</h2>

			<div on:click|stopPropagation={() => {}} class="flex gap-5 py-2">
				{#if instagram}
					<a href={instagram} {target}>
						<iconify-icon icon="mdi:instagram" height="2.5rem" />
					</a>
				{/if}
				{#if github}
					<a href={github} {target}>
						<iconify-icon icon="mdi:github" height="2.5rem" />
					</a>
				{/if}
				{#if linkedin}
					<a href={linkedin} {target}>
						<iconify-icon icon="mdi:linkedin" height="2.5rem" />
					</a>
				{/if}
			</div>
			{#if quote}
				<p class="px-10 py-4 text-center">{quote}</p>
			{/if}
		</div>
	</div>
</div>
