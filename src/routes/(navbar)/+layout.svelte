<script>
	import AuthButton from '$lib/components/Auth/AuthButton.svelte';
	import Footer from '$lib/components/HeaderFooter/Footer.svelte';
	import Navbar from '$lib/components/HeaderFooter/Navbar.svelte';
	import Vectorall from '$lib/components/VectorBackground/vectorall.svelte';
</script>

<Navbar />
<!-- <Vectorall /> -->
<slot />

<Footer />
