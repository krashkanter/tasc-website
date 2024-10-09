<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Table from '$lib/components/ui/table';
	import { downloadData } from '../utils.js';
	import { Download } from 'lucide-svelte';

	export let data;

	const events = data.adminData.events;

	const columns = ['title', 'date', 'reportLink', 'venue', 'category', 'type', 'published'];
</script>

<button
	class="mt-4 flex flex-row flex-nowrap items-center gap-2 rounded-md border-2 bg-slate-300 p-2 dark:bg-slate-800"
	on:click={() => {
		if (events) {
			downloadData(events, columns, 'events');
		}
	}}><Download />Download Data</button
>

<div class="h-[80vh] overflow-auto">
	<Table.Root>
		<Table.Caption>List of all Events</Table.Caption>
		<Table.Header>
			<Table.Row>
				{#each columns as column}
					<Table.Head>{column}</Table.Head>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each events as event}
				<Table.Row>
					{#each columns as column}
						<!-- ts-ignore-next-line -->
						{#if column === 'reportLink'}
							<Table.Cell>
								<a href={event[column]} target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Report</a>
							</Table.Cell>
						{:else if column === 'title'}
							<Table.Cell>
								<button
									on:click={() => {
										goto(`/admin/events/${event.id}`);
									}}
									class="cursor-pointer rounded-md bg-slate-300 p-2 dark:bg-slate-800">{event[column]}</button
								>
							</Table.Cell>
						{:else}
							<Table.Cell>{event[column]}</Table.Cell>
						{/if}
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
