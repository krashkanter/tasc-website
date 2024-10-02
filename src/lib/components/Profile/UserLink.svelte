<script lang='ts'>
	export let icon: string = '';
	// export let platform = 'none';
	export let url: string | null | undefined = '/';
	export let title = 'A cool title';
	export let disabled = false;
</script>

{#if disabled}
	<div class="flex w-[140px] rounded-md border border-muted bg-slate-100 text-center duration-150 dark:bg-slate-800">
	
		<div class="flex max-w-sm items-center px-4">
			<iconify-icon icon={icon !== 'custom' ? `mdi:${icon}` : 'mdi:earth'} height="20" />
			<span class="m-2 text-center text-base font-medium">{title}</span>
		</div>
	</div>
{:else}
	<a href={url} class="flex h-10 max-w-sm items-center justify-center gap-x-2 rounded-lg border border-muted border-hidden transition-all duration-300 hover:scale-105 sm:w-36 sm:border-solid">
		{#if icon === 'instagram'}
			<iconify-icon icon="mdi:instagram" height="20" />
			<span class="hidden sm:block">{title}</span>
		{:else if icon === 'twitter'}
			<iconify-icon icon="simple-icons:x" height="16" />
			<span class="hidden sm:block">{title}</span>
		{:else if icon === 'linkedin'}
			<iconify-icon icon="mdi:linkedin" height="20" />
			<span class="hidden sm:block">{title}</span>
		{:else if icon === 'github'}
			<iconify-icon icon="mdi:github" height="20" />
			<span class="hidden sm:block">{title}</span>
		{:else}
			<iconify-icon icon="mdi:earth" height="20" />
			<!-- <img src={'/custom.svg'} alt={platform} width="10" height="10" /> -->
			<span class="hidden sm:block">{title}</span>
		{/if}
	</a>
{/if}
