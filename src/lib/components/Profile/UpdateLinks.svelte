<script lang="ts">
	import SortableList from '$lib/components/Profile/SortableList.svelte';
	import UserLink from '$lib/components/Profile/UserLink.svelte';
	// import { db, userData, userID, userProfileData } from '$lib/firebase/firebase';
	// import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
	import { user, userProfileData, setUser } from '$lib/auth/stores';
	import { writable } from 'svelte/store';
	import { success, failure } from '../Toast/toast';
	import { Button, buttonVariants } from '$lib/components/ui/custom_button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';

	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import { onMount } from 'svelte';

	let disabled = false;
	const icons: Array<{ value: string; label: string }> = [
		{ value: 'instagram', label: 'Instagram' },
		{ value: 'twitter', label: 'Twitter' },
		{ value: 'linkedin', label: 'LinkedIn' },
		{ value: 'github', label: 'GitHub' },
		{ value: 'custom', label: 'Custom' }
	];
	const formDefaults = {
		icon: 'instagram',
		title: '',
		url: 'https://'
	} satisfies formType;

	type formType = {
		icon: string;
		title: string;
		url: string;
	};

	const formData = writable(formDefaults);

	let showForm = false;

	$: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
	$: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
	$: formIsValid = urlIsValid && titleIsValid;

	async function sortList(e: CustomEvent) {
		const response = await fetch('/api/username/links', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: $user?.id, order: e.detail })
		})

		const data = await response.json()
		if(data.data)
			setUser(data.data);
	}

	async function addLink(e: SubmitEvent) {
		const body: any = { id: $user?.id }
		body.order = [...($userProfileData?.order || []), $formData.icon === 'custom' ? $formData.title : $formData.icon]
		if ($formData.icon === 'custom') body.custom = { [$formData.title]: $formData.url }
		else body[$formData.icon] = $formData.url

		const response = await fetch('/api/username/links', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})

		const data = await response.json()
		if(data.data) {
			formData.set(formDefaults);
			showForm = false;
			success('Link added successfully');
			setTimeout(() => { setUser(data.data) }, 3000);
		}else {
			formData.set(formDefaults);
			showForm = false;
			failure('Failed to add link');
		}
	}

	async function deleteLink(item: string) {
		const body: any = { id: $user?.id, order: $userProfileData?.order.filter((link: string) => link !== item) }
		if (['instagram', 'linkedin', 'twitter', 'github'].includes(item)) body[item] = null;
		else {
			const { [item]: _, ...remainingCustom } = $userProfileData?.custom ?? {};
  			body.custom = remainingCustom;
		}

		const response = await fetch('/api/username/links', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})

		const data = await response.json()
		if(data.data) {
			success('Link deleted successfully');
			setTimeout(() => { setUser(data.data) }, 3000);
		}else
			failure('Failed to delete link');
	}

	function cancelLink() {
		formData.set(formDefaults);
		showForm = false;
	}

	function getItemIcon(item: string) {
		if (['instagram', 'linkedin', 'twitter', 'github'].includes(item)) return item;
		return 'custom';
	}

	function getItemUrl(item: string) {
		if (['instagram', 'linkedin', 'twitter', 'github'].includes(item)) return $userProfileData?.[item] ?? '';
		else if ($userProfileData?.custom?.[item]) return $userProfileData?.custom[item];
	}

	function getItemTitle(item: string): string {
		if ($userProfileData?.[item] || $userProfileData?.custom?.[item]) return icons.find((icon) => icon.value === item)?.label ?? '';
		else return 'Unknown';
	}
</script>

<div class="grid-item flex flex-col border">
	<h1 class="text-2xl font-medium">Update your social links</h1>
	<p class="text-base text-muted mt-1">Drag and drop to reorder your links</p>
	<Dialog.Root bind:open={showForm}>
		{#if $userProfileData?.order?.length !== 8}
			<Dialog.Trigger class="{buttonVariants({ variant: 'secondary' })} m-2 w-1/3 min-w-fit self-center rounded-full border border-primary bg-transparent">Add Links</Dialog.Trigger>
		{:else}
			<p>You have reached max link limit!</p>
		{/if}

		<Dialog.Content class="sm:max-w-[425px]">
			{#if $userProfileData?.order?.length !== 8}
				<form on:submit|preventDefault={addLink}>
					<Dialog.Header class="mb-4">
						<Dialog.Title>Add a Link</Dialog.Title>
						<Dialog.Description>Enter the details of your link.</Dialog.Description>
					</Dialog.Header>

					<div class="flex flex-col gap-4">
						<Select.Root
							onSelectedChange={(item) => {
								disabled = false;
								// @ts-ignore
								$formData.icon = item?.value;

								if (item?.value !== 'custom') {
									// @ts-ignore
									$formData.title = item?.label;
									disabled = true;
								}
							}}
						>
							<Select.Trigger class="w-[180px]">
								<Select.Value placeholder="Select an icon" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Icons</Select.Label>
									{#each icons as icon}
										<Select.Item {...icon}>{icon.label}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>

						<Input name="title" type="text" placeholder={'Enter a title'} bind:value={$formData.title} {disabled} />
						<Input name="url" type="text" placeholder="URL" bind:value={$formData.url} />

						<Label>
							{#if !titleIsValid || !urlIsValid}
								New link must have valid title and URL
							{/if}
							{#if formIsValid}
								Looks good!
							{/if}
						</Label>
					</div>

					<Dialog.Footer class="mt-4">
						<Button type="submit" disabled={!formIsValid}>Add Link</Button>
					</Dialog.Footer>
				</form>
			{:else}
				<p>You have reached max link limit!</p>
			{/if}
		</Dialog.Content>
	</Dialog.Root>

	<SortableList list={$userProfileData?.order ?? []} on:sort={sortList} let:item let:index>
		<div class="group relative">
			<UserLink icon={getItemIcon(item)} url={getItemUrl(item)} title={getItemTitle(item)} disabled={true} />
			<!-- <Button on:click={() => deleteLink(item)} class="absolute -right-4 bottom-6 bg-transparent hover:bg-transparent duration-300 transition-all"><iconify-icon icon="mdi:instagram" height="20" /></Button> -->
			<button on:click={() => deleteLink(item)} class="absolute -right-5 bottom-5 cursor-pointer rounded-md px-4 py-1 text-primary opacity-0 transition-all group-hover:opacity-100"><iconify-icon icon="maki:cross" height="20"></iconify-icon></button>
		</div>
	</SortableList>
</div>

<style>
	.grid-item {
		grid-column: 2/3;
		grid-row: 1/2;
	}
</style>
