<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog-nandanfucker';

	export let image: string;
	export let image2: string = image;
	export let imageAlt: string = 'profile';
	export let name: string;
	export let designation: string = 'Professor';
	export let designation2: string | null;
	export let about: Array<string> = [];
	// export let target: string = '_blank';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<div class="dark:custom-shadow-black w-60 cursor-pointer h-64 overflow-hidden rounded-lg border bg-card pt-4 shadow-xl duration-300 ease-in-out hover:scale-105">
			<div class="mx-14 flex items-center justify-center">
				<img src={image} alt={imageAlt} class="aspect-square w-full rounded-full border border-border object-cover" />
			</div>
			<div class="flex flex-col items-center justify-center">
				<h1 class="pt-4 text-xl font-bold">{name}</h1>
				<h2 class="text-lg font-medium text-zinc-600 dark:text-slate-400">{designation}</h2>
				{#if designation2}
					<h2 class="text-lg text-zinc-600 dark:text-slate-400 font-bold">{designation2}</h2>
				{/if}
			</div>
		</div>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-[70vh] max-w-lg overflow-hidden lg:max-w-4xl">
		<Dialog.Header class="w-full">
			<Dialog.Title class="text-2xl font-bold">{name}</Dialog.Title>
			<Dialog.Description class="text-lg font-medium">{designation}</Dialog.Description>
		</Dialog.Header>

		<div class="flex flex-col justify-center lg:flex-row">
			<div class="flex min-w-[16rem] justify-center object-cover md:flex-shrink-0 lg:min-w-[24rem]">
				<img src={image2} alt={imageAlt} class="aspect-square w-64 object-cover md:flex-shrink-0 lg:w-96" />
			</div>

			<div class="flex flex-grow flex-col overflow-y-auto space-y-8 px-4">
				{#each about as para}
					<p>{para}</p>
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
