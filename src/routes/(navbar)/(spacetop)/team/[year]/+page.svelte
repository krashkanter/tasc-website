<script lang="ts">
	import MemberCardGrid from '$lib/components/CardGrids/MemberCardGrid.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	let year = $page.params.year;
	export let data: PageData;
</script>

<div>
	<div class={'flex w-full justify-center space-x-8 py-10 font-bold md:space-x-16'} data-sveltekit-reload>
		<a href="/team/2021">
			<button class={`text-xl md:text-2xl ${year === '2021' ? 'underline underline-offset-4' : 'no-underline'}`}> 2021-22 </button>
		</a>
		<a href="/team/2022">
			<button class={`text-xl md:text-2xl ${year === '2022' ? 'underline underline-offset-4' : 'no-underline'}`}> 2022-23 </button>
		</a>
		<a href="/team/2023">
			<button class={`text-xl md:text-2xl ${year === '2023' ? 'underline underline-offset-4' : 'no-underline'}`}> 2023-24 </button>
		</a>
		<a href="/team/2024">
			<button class={`text-xl md:text-2xl ${year === '2024' ? 'underline underline-offset-4' : 'no-underline'}`}> 2024-25 </button>
		</a>
	</div>
	<MemberCardGrid members={data.members} />
</div>
