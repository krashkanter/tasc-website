import { db } from "$lib/db/db";

export async function PATCH({ request }) {
    const data = await request.json();
    const { id, ...updateData } = data;

    const links = await db.links.findUnique({ where: { userId: id } });

    let dbData: any = null;

    if(links) {
        dbData = await db.links.update({
            where: { userId: id },
            data: { ...updateData }
        });
    }else {
        dbData = await db.links.create({
            data: { userId: id, ...updateData }
        });
    }

    if(dbData){
        const user = await db.user.findUnique({ where: { id: id } });
        return new Response(JSON.stringify({ message: 'Done', data: { session: { user: user }, links: dbData } }), { status: 200 });
    }
    else
        return new Response(JSON.stringify({ message: 'Not done', data: null }), { status: 200 });
}