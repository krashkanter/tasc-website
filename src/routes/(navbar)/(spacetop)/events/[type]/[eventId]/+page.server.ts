import { db } from '$lib/db/db';
// import { user } from '$lib/auth/stores';

// export const load = async({params})=>{
//     const eventId=params.eventId;
//     const event=await db.event.findUnique({
//         where:{
//             id:eventId
//         }
//     })

//     return ({event:event})
// }

export const load = async (event) => {
	const session = await event.locals.auth();

	const eventDetail = await db.event.findUnique({
		where: {
			id: event.params.eventId
		}
	});

	if (session === null) {
		return {
			event: eventDetail
		};
	}

	const teams = await db.team.findFirst({
		where: {
			user: {
				some: {
					id: session?.user?.id
				}
			},
			eventId: event.params.eventId
		},
		include: {
			user: true,
			event: true
		}
	});

	return {
		event: eventDetail,
		teams: teams ?? null
	};
};
