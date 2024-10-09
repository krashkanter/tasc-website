import { db } from '$lib/db/db.js';

export async function POST({ request }) {
	const req = await request.json();

	const { state, teamId } = req;

	if (!teamId) {
		return new Response(
			JSON.stringify({
				error: 'State and teamId are required'
			}),
			{ status: 400 }
		);
	} else {
		try {
			const team = await db.team.update({
				where: {
					id: teamId
				},
				data: {
					attended: state
				}
			});
			
			return new Response(
				JSON.stringify({
					team: team
				}),
				{ status: 200 }
			);
		} catch (e) {
			return new Response(
				JSON.stringify({
					error: e
				}),
				{ status: 400 }
			);
		}
	}
}
