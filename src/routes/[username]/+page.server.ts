// import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
// import type { PageLoad } from './$types';
// import { error } from '@sveltejs/kit';
// import type { ProfileData } from '$lib/types/ProfileData';
// import { db } from '$lib/firebase/firebase';
import { db } from '$lib/db/db';
import type { User } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const ssr = true;

export const load = (async ({ params }) => {
	// update the datamodel to include username in the profile collection
	// currently you're querying firebase user collection to get the id
	// and then querying the profile collection to get the data
	// this should be updated soon

	const userName = params.username;

	const dbData: User | null = await db.user.findFirst({
		where: {
			username: userName
		}
	});

	return {
		...dbData
	};
}) satisfies PageServerLoad;
