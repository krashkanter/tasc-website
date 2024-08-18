<script>
	import AboutSection from '$lib/components/Hackathon/AboutSection.svelte';
	import DateComponent from '$lib/components/Hackathon/DateComponent.svelte';
	import Footer from '$lib/components/Hackathon/Footer.svelte';
	import Hero from '$lib/components/Hackathon/HeroSection.svelte';
	import Rewards from '$lib/components/Hackathon/Rewards.svelte';
	import Themes from '$lib/components/Hackathon/Themes.svelte';
	import TimelineBetter from '$lib/components/Hackathon/TimelineBetter.svelte';
	import ProblemStatements from '$lib/components/Hackathon/ProblemStatements.svelte';
	import MainButton from '$lib/components/Hackathon/MainButton.svelte';

	const images = [
		{
			src: '/assets/icons/13@1x.png',
			alt: 'logo',
			className: `w-60 sm:visible invisible pr-40 md:ml-0 ml-5 md:p-14 float mt-[45rem] absolute`
		},
		{
			src: '/assets/icons/04@1x.png',
			alt: 'logo',
			className: `w-60 pl-40 md:mr-0 mr-5 md:p-14 float1 absolute right-0 mt-[60rem]`
		},

		{
			src: '/assets/icons/13@1x.png',
			alt: 'logo',
			className: `visible sm:invisible w-60 pr-40 md:ml-0 ml-5 md:p-14 float2 absolute mt-[75rem]`
		},
		{
			src: '/assets/icons/12@1x.png',
			alt: 'logo',
			className: `w-60 pl-40 md:mr-0 mr-5 md:p-14 float1 absolute md:mt-[125rem] mt-[167rem] right-0`
		},
		{
			src: '/assets/icons/03@1x.png',
			alt: 'logo',
			className: `w-60 pr-40 md:ml-0 ml-5 md:p-14 float absolute md:mt-[180rem] mt-[200rem]`
		},
		{
			src: '/assets/icons/07@1x.png',
			alt: 'logo',
			className: `w-60 pl-40 md:mr-0 mr-5 md:p-14 float1 absolute mt-[245rem] md:mt-[213rem] right-0`
		}
	];
</script>

<main class="min-h-screen text-white">
	<!-- <div class="-z-20">
		
		{#each images as image}
			<img src={image.src} alt={image.alt} class={image.className} />
		{/each}
	</div> -->

	<section id="home">
		<Hero />
	</section>

	<section class="my-20 bg-red-600 py-20" id="date">
		<DateComponent />
		<!-- <p class="pb-4 pt-6 text-center text-2xl">Hello {$userData.name}!</p> -->
		<div class="flex justify-center gap-4 pt-6">
			<a href="/snh2023/qualified"><MainButton>Qualified teams</MainButton></a>
			<a href="/snh2023/team"><MainButton><span>Join/Create Team</span></MainButton></a>
		</div>
		<div class="flex justify-center gap-4 pt-6">
			<a href="snh2023/brochure.pdf" target="_blank"><MainButton>Hackathon Brochure</MainButton></a>
		</div>
		<div class="flex justify-center gap-4 pt-6">
			<a href="snh2023/winners"><MainButton>Check out the winners of SNH2023</MainButton></a>
		</div>
	</section>

	<div id="about">
		<AboutSection />
	</div>

	<section id="ps" class="flex w-full justify-center pt-6">
		<ProblemStatements />
	</section>

	<section id="timeline" class="pt-6">
		<TimelineBetter />
		<h1 class="font-jbExtrabold my-10 py-5 text-center text-4xl md:py-10 md:text-5xl">Final 24 Hour Hackathon</h1>
		<div class="flex w-full flex-col items-center justify-center gap-x-10 gap-y-10 md:flex-row">
			<img src="/snh2023/InauguralWithTime.png" alt="Inaugral" class="h-2/3 w-2/3 rounded-2xl md:h-1/3 md:w-1/3" />
			<img src="/snh2023/ValedictoryWithTime.png" alt="Valedictory" class="h-2/3 w-2/3 rounded-2xl md:h-1/3 md:w-1/3" />
		</div>
	</section>

	<!-- <section id="themes">
		<Themes />
	</section> -->

	<section id="goodies" class="pt-6">
		<Rewards />
		<!-- <Sponsors /> -->
	</section>
</main>
