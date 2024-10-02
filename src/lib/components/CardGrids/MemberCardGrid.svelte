<script lang="ts">
	import type MemberData from '$lib/types/MemberData';
	import MemberCard from '../Card/MemberCard.svelte';
	export let members: MemberData[];
</script>

<div class="grid-container px-4 py-5">
	{#each members as profile, index}
		<MemberCard {...profile} lazy={index > 4} />
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		justify-items: center;
		justify-content: end;
		align-content: end;
		/* Define your column size and minimum width */
		row-gap: 4rem;
	}
</style>
