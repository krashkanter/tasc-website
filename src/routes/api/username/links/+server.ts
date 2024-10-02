import { db } from "$lib/db/db";

export async function PATCH({ request }) {
    const data = await request.json();
    const { id, ...updateData } = data;

    const dbData = await db.links.update({
        where: { userId: id },
        data: { ...updateData }
    });

    if(dbData){
        const user = await db.user.findUnique({ where: { id: id } });
        return new Response(JSON.stringify({ message: 'Done', data: { session: { user: user }, links: dbData } }), { status: 200 });
    }
    else
        return new Response(JSON.stringify({ message: 'Not done', data: null }), { status: 200 });
}