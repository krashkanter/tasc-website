import { db } from "$lib/db/db";

export async function load(){
    const events = await db.event.findMany();

    return {
        adminData: {
            events: events
        }
    }
}