import { db } from '$lib/db/db.js';

export async function load({ url}) {
    const eventId = url.pathname.split('/').filter(Boolean)[2];
    
    const eventData = await db.event.findFirst({
        where:{
            id: eventId
        },
        select:{
            participants: {
                select: {
                    id: true,
                    name: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            displayName: true,
                            username: true,
                            phone: true
                        }
                    },
                    attended: true
                }
            },
        }
    })    

    const winnersData = await db.winners.findMany({
        where: {
            eventId: eventId
        }
    })

    return {
        adminData: {
            participants: eventData?.participants ?? [],
            winnersData: winnersData
        }
    }
}   