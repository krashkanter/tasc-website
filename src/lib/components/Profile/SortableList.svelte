<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';

	interface Item {
		id: string;
		index: number;
	}

	export let list: string[];
	let isOver: string | boolean = false;

	const dispatch = createEventDispatcher();

	function getDraggedParent(node: any): Item {
		const index = node.dataset?.index;
		return { id: list[index], index: parseInt(index) };
	}

	function onDragStart(e: DragEvent) {
		// @ts-ignore
		const dragged = getDraggedParent(e.target);
		e.dataTransfer?.setData('source', dragged?.index.toString());
	}

	function onDragOver(e: DragEvent) {
		// @ts-ignore
		const id = e.target.dataset?.id;
		const dragged = getDraggedParent(e.target);
		isOver = dragged?.id ?? false;
	}

	function onDragLeave(e: DragEvent) {
		const dragged = getDraggedParent(e.target);
		isOver === dragged.id && (isOver = false);
	}

	function onDrop(e: DragEvent) {
		isOver = false;
		const dragged = getDraggedParent(e.target);
		reorder({
			from: parseInt(e.dataTransfer?.getData('source') || '0'),
			to: dragged.index
		});
	}

	const reorder = ({ from, to }: { from: number, to: number }) => {
		const newList = [...list];
		const [movedItem] = newList.splice(from, 1);
		newList.splice(to, 0, movedItem);

		dispatch('sort', newList);
	};
</script>

<div class="flex justify-center items-center">
	{#if list?.length}
		<ul class={`list-none items-center p-0 flex flex-wrap justify-center`}>
			{#each list as item, index (item)}
				<li class="rounded-xl border-2 border-dashed border-transparent p-2 transition-all" class:over={item === isOver} data-index={index} data-id={item} draggable="true" on:dragstart={onDragStart} on:dragover|preventDefault={onDragOver} on:dragleave={onDragLeave} on:drop|preventDefault={onDrop} animate:flip={{ duration: 300 }}>
					<slot {item} {index} />
				</li>
			{/each}
		</ul>
	{:else}
		<p class="m-2 w-full border-2 rounded-md p-4">You don't have any links</p>
	{/if}
</div>

<style lang="postcss">
	.over {
		@apply scale-105 border-gray-400;
	}
</style>
