import { db } from '$lib/db/db';
import type { ServerLoad } from "@sveltejs/kit"

export const load = (async ({ params }) => {
	const placement = await db.year.findFirst({
		where: { year: params.year },
		include: {
			placements: {
				include: {
					student: {
						include: { user: true }
					},
					offers: {
						include: {
							company: true,
						}
					},
				}
			}
		}
	});

	const companies = await db.company.findMany();

	let placements: Record<string, any[]> = {};

	placement?.placements.forEach(p => {
		p.offers.forEach(o => {
			const companyName = o.company.companyName;

			if (!placements[companyName])
				placements[companyName] = [];

			placements[companyName].push({
				studentId: p.student.id,
				studentName: p.student.user.displayName,
				studentImage: p.student.image,
				studentPackage: o.package
			});
		})
	})

	return {
		companies: { names: placement?.companies, companies: companies },
		placements: placements
	}
}) satisfies ServerLoad;


