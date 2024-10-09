import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = await event.locals.auth();
    const isAdmin = session?.user?.role === "ADMIN";
    
    if(!isAdmin) {
        throw redirect(302,"/")
    }
}
