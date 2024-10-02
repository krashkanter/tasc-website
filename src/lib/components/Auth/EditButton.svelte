<script lang="ts">
	import { user, userData, userLoaded } from '$lib/auth/stores';
	import { Button } from '../ui/custom_button';
	export let currentUsername: string | null;
</script>

{#if !$userLoaded}
	<span></span>
{:else if $user && $userData && $userData.username === currentUsername}
	<a href="/{$userData.username}/edit" class="text-center"><Button class="border bg-transparent text-primary" variant={'secondary'}>Edit Profile</Button></a>
{/if}
