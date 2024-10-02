<script>
	import AuthButton from '$lib/components/Auth/AuthButton.svelte';
	import Footer from '$lib/components/HeaderFooter/Footer.svelte';
	import Navbar from '$lib/components/HeaderFooter/Navbar.svelte';
	import Vectorall from '$lib/components/VectorBackground/vectorall.svelte';
</script>

<Navbar />
<Vectorall />
<slot />
<Footer />

<svelte:head>
	<style>
		::-webkit-scrollbar {
			width: 8px;
		}
		::-webkit-scrollbar-thumb {
			background-color: #4b5563;
			border-radius: 10px;
		}

		::-webkit-scrollbar-thumb:hover {
			@apply cursor-pointer
		}
	</style>
</svelte:head>
