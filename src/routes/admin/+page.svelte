<script lang="ts">
	import { userProfileData } from '$lib/auth/stores';
</script>

<div class="flex h-full w-full justify-center items-center">
	<div class="flex flex-col items-center">
		<h1 class="text-3xl font-bold mb-4">Welcome {$userProfileData?.displayName}</h1>
        <p>This is Admin Dashboard</p>
        <a class="text-blue-600 underline" href="/">Go to Home</a>
	</div>
</div>
