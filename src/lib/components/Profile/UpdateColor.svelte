<script lang="ts">
	import Button from '$lib/components/ui/custom_button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	// import { db, userID, userProfileData } from '$lib/firebase/firebase';
	// import { doc, updateDoc } from 'firebase/firestore';
	import { user, userProfileData, setUser } from '$lib/auth/stores';
	import { information, success, failure } from '../Toast/toast';

	let color_light: string = $userProfileData?.lightTheme ?? '';
	let color_dark: string = $userProfileData?.darkTheme ?? '';

	function resetColor() {
		color_light = '';
		color_dark = '';
		updateColor(null);

		information('Color has been reset!');
	}

	async function updateColor(e: Event | null) {
		const response = await fetch('/api/username', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: $user?.id,
				lightTheme: color_light,
				darkTheme: color_dark
			})
		});
		const data = await response.json();

		if (data.data) {
			success('Updated Color successfully');
			setTimeout(() => { setUser(data.data) }, 3000);
		} else {
			failure('Failed to update Phone');
		}
	}
</script>

<div class="h-[428px]">
	<h1 class="text-2xl font-medium">Custom background color</h1>
	<div class="flex w-full flex-col gap-y-4 pb-4 pt-2">
		<Label class="flex flex-col gap-y-1 text-muted"><span>Lightmode Color:</span> <span class="text-primary">{$userProfileData?.lightTheme ? $userProfileData?.lightTheme : 'Default'}</span></Label>
		<Label class="flex flex-col gap-y-1 text-muted"><span>Darkmode Color:</span><span class="text-primary">{$userProfileData?.darkTheme ? $userProfileData?.darkTheme : 'Default'}</span></Label>
	</div>

	<div class="grid gap-1">
		<Label for="color_light">Light mode color</Label>
		<Input type="color" name="color_light" bind:value={color_light} class="cursor-pointer border-none" />

		<Label for="color_dark">Dark mode color</Label>
		<Input type="color" name="color_dark" bind:value={color_dark} class="cursor-pointer border-none" />
	</div>
	<Button class="mt-2 w-1/3 min-w-fit self-center border hover:bg-background" variant="ghost" on:click={updateColor}>Update Color</Button>
	<Button class="mt-2 w-1/3 min-w-fit self-center border hover:bg-background" variant="ghost" on:click={resetColor}>Reset Color</Button>

	<p class="mt-4 text-muted">Note that changing these color will reflect only on profile page and anyone viewing your profile will have that color reflected</p>
</div>
