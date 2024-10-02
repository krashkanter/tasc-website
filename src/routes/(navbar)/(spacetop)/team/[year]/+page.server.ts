import { db } from '$lib/db/db';
import type MemberData from '$lib/types/MemberData';
import { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	let members: MemberData[] = [];
	
	const membersSnapshot = await db.core.groupBy({
		by: ['id', 'image', 'order', 'post', 'quote', 'year', 'userId'],
		orderBy: { order: 'asc' },
		where: { year: params.year }
	});

	await Promise.all(membersSnapshot.map(async ({ order, ...rest }) => {
		const info = await db.user.findUnique({ where: { id: rest.userId } });
		const links = await db.links.findUnique({ where: { userId: rest.userId } });
		info && members.push({
			id: rest.id,
			image: rest.image,
			name: info.displayName,
			quote: rest.quote,
			post: rest.post,
			instagram: links?.instagram,
			linkedin: links?.linkedin,
			github: links?.github,
		});
	}));

	return { members: members };
}) satisfies ServerLoad;
