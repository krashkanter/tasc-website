<script lang="ts">
	// import { db, userID, userProfileData } from '$lib/firebase/firebase';
	// import { doc, updateDoc } from 'firebase/firestore';
	import { user, userProfileData, setUser } from '$lib/auth/stores';
	import { exclaim, success, failure } from '../Toast/toast';
	import Button from '../ui/custom_button/button.svelte';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	let college = '';

	// regular expressioin to include the specified set of characters - A-Za-z 0-9~'!#()[]{}",._
	const reCollege = /^[A-Za-z0-9!#()'{}",._ ]{4,40}$/;
	$: isValidCollege = college?.length >= 4 && college?.length <= 40 && reCollege.test(college);
	$: isTouchedCollege = college.length >= 1;

	async function updateCollege(e: Event) {
		if (!isValidCollege) {
			exclaim('Please use only the specified set of characters - A-Za-z0-9~!#()[]{}",._ and make sure that you have entered 4 to 40 characters');
			return;
		}
		const response = await fetch('/api/username', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: $user?.id,
				college: college
			})
		});
		const data = await response.json();

		if (data.data) {
			success('Updated College successfully');
			college = '';
			setTimeout(() => { setUser(data.data) }, 3000);
		} else {
			failure('Failed to update Phone');
		}
	}
</script>

<h1 class="text-2xl font-medium">Update your College</h1>

<div class="w-full py-1">
	<Label class="text-base text-muted">{$userProfileData?.college}</Label>
</div>

<Input name="college" placeholder="Enter your college name here" class="border-muted focus:border-primary" bind:value={college} />
<Button class="mt-4 w-1/3 min-w-fit self-center border hover:bg-background" variant="ghost" on:click={updateCollege}>Update College</Button>
