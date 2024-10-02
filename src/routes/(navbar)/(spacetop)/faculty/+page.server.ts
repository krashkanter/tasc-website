// import { db } from '$lib/firebase/firebase';
import { db } from '$lib/db/db';
import type FacultyData from '$lib/types/FacultyData';
import { ServerLoad } from '@sveltejs/kit';

export const load = (async () => {
	const facultySnapshot = await db.faculty.groupBy({
		by: ['id', 'about', 'name', 'email', 'designation', 'designation2', 'image', 'order'],
		orderBy: { order: 'asc' },
		where: { published: true }
	});
	
	let faculties: FacultyData[] = [];

	facultySnapshot.forEach(({ order, ...rest }) => {
		faculties.push({ ...rest })
	});

	return { faculties: faculties };
}) satisfies ServerLoad;
