<script>
	import 'iconify-icon';
	import { NAVITEM } from '$lib/data/NavbarItems';
	import { page } from '$app/stores';
</script>

<hr />

<div class="flex w-full flex-col items-center justify-between px-4 py-3 md:flex md:px-16 md:py-6">
	<div class="flex flex-row flex-wrap content-center items-center justify-center py-5">
		<div class="px-5">
			<img class="md:w-21 w-15 h-5 md:h-7" src="https://firebasestorage.googleapis.com/v0/b/tasc-8df79.appspot.com/o/TASCLogo.png?alt=media&token=885899c8-a49c-46d7-9d22-ebc5507964db&_gl=1*1sdhvuu*_ga*MTE2MzE3ODExMC4xNjk1Mzg4Nzkx*_ga_CW55HF8NVT*MTY5NjIxODM2NC4xOS4xLjE2OTYyMTg2ODMuNjAuMC4w" alt="" />
		</div>
		<div class="md:text-md py-3 text-center text-sm lg:text-lg">Turing Artificial Intelligence Students Committee</div>
	</div>

	<ul class={'flex space-x-8 text-black dark:text-white'}>
		<a href={'https://www.instagram.com/tasc_nmamit/'} target={'_blank'} class="duration-200 hover:scale-110">
			<iconify-icon icon="mdi:instagram" height="2rem" />
		</a>
		<a href={'https://github.com/tasc-nmamit'} target={'_blank'} class="duration-200 hover:scale-110">
			<iconify-icon icon="mdi:github" height="2rem" />
		</a>
		<a href={'https://www.linkedin.com/company/tasc-aiml/'} target={'_blank'} class="duration-200 hover:scale-110">
			<iconify-icon icon="mdi:linkedin" height="2rem" />
		</a>
	</ul>

	<ul class="flex flex-wrap justify-center py-5">
		{#each NAVITEM as item}
			<a href={`${item.href}`}>
				<li class="text-md px-2 md:px-5" class:underline={$page.url.pathname.split('/')[1] === item.title.toLowerCase() || ($page.url.pathname === '/' && item.title === 'Home')}>
					<span>{item.title}</span>
				</li>
			</a>
		{/each}
	</ul>

	<a href="https://github.com/tasc-nmamit" target="_blank"><span class="md:text-md text-sm">With regards from technical team :)</span></a>

	<div>
		<h1 class="pt-3 text-xl">© TASC 2024</h1>
	</div>
</div>
<!-- 
<div class={'flex w-full items-center justify-between bg-primary-light px-4 py-3 dark:bg-primary-dark md:hidden'}>
	<div class={'flex space-x-1'}>
		<img src="https://firebasestorage.googleapis.com/v0/b/tasc-8df79.appspot.com/o/TASCLogo.png?alt=media&token=885899c8-a49c-46d7-9d22-ebc5507964db&_gl=1*1sdhvuu*_ga*MTE2MzE3ODExMC4xNjk1Mzg4Nzkx*_ga_CW55HF8NVT*MTY5NjIxODM2NC4xOS4xLjE2OTYyMTg2ODMuNjAuMC4w" alt="" class="w-15 h-5" />
		<div class={'items-center border-l-2 border-gray-500'}>
			<h1 class={'pl-1 text-sm text-gray-500'}>© 2023 TASC</h1>
		</div>
	</div>

	<a href='https://github.com/tasc-nmamit' target={'_blank'}><span class={'text-sm text-black dark:text-white'}>Made with ❤️</span></a>

	<ul class={'flex items-center space-x-3 pt-2 text-black dark:text-white'}>
		<a href={'https://www.instagram.com/tasc_nmamit/'} target={'_blank'}>
			<iconify-icon icon="mdi:instagram" height="1.2rem" />
		</a>
		<a href={'https://github.com/tasc-nmamit'} target={'_blank'}>
			<iconify-icon icon="mdi:github" height="1.2rem" />
		</a>
		<a href={'https://www.linkedin.com/company/tasc-aiml/'} target={'_blank'}>
			<iconify-icon icon="mdi:linkedin" height="1.2rem" />
		</a>
	</ul>
</div> -->
