<script lang="ts">
	import { Icons } from '$lib/components/docs/icons';
	import { Button } from '$lib/components/ui/custom_button';

	import { user } from '$lib/auth/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

{#if $user}
	<Button variant="ghost" on:click={() => {
		signOut()
	}}>Sign out</Button>
{:else}
	<Button variant="ghost" on:click={() => {
		signIn("google")
	}}>
		<Icons.google class="mr-2 h-4 w-4" />
		Login
	</Button>
{/if}
