<script lang="ts">
	import { userProfileData, user, setUser } from '$lib/auth/stores';
	import { exclaim, failure, success } from '../Toast/toast';
	import Button from '../ui/custom_button/button.svelte';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	let phone = '';

	const rePhone = /^[0-9]{10}$/;
	$: isValidPhone = phone?.length === 10 && rePhone.test(phone);
	$: isTouchedPhone = phone.length >= 1;

	async function updatePhone(e: Event) {
		if (!isValidPhone) {
			exclaim('Please enter a valid phone number!');
			return;
		}

		const response = await fetch('/api/username', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: $user?.id,
				phone: phone
			})
		});
		const data = await response.json();

		if (data.data) {
			success('Updated Phone successfully');
			phone = '';
			setTimeout(() => { setUser(data.data) }, 3000)
		} else {
			failure('Failed to update Phone');
		}
	}
</script>

<div>
	<h1 class="text-2xl font-medium">Update your Phone Number</h1>
	<div class="w-full py-1">
		<Label class="text-base font-medium text-muted"><span>{$userProfileData?.phone}</span></Label>
	</div>

	<div class="grid gap-1.5">
		<Input class="border-muted focus:border-primary" name="phone" placeholder="Enter your Whatsapp Phone Number here" bind:value={phone} />
	</div>
	<Button class="mt-4 w-1/3 min-w-fit self-center border hover:bg-background" variant="ghost" on:click={updatePhone}>Update Phone</Button>
</div>
