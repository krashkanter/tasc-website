import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from '$lib/auth/auth';

export const handle = sequence(authHandle);
