import { db } from '$lib/db/db';
import { ServerLoad, redirect } from '@sveltejs/kit';

export const load = (async ({params}) => {
	const eventDetail = await db.event.findUnique({
		where: { id: params.eventId },
		include: { participants: true }
	});

	if (eventDetail?.registrationsAvailable === false) {
		throw redirect(302, `/events/${params.type}/${params.eventId}`);
	}

	return { event: eventDetail };
}) satisfies ServerLoad;
