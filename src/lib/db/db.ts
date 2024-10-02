import { PrismaClient } from '@prisma/client';
import { HOST_STATUS } from '$env/static/private';

const createPrismaClient = () =>
	new PrismaClient({
		log: HOST_STATUS === 'development' ? ['query', 'error', 'warn'] : ['error']
	});

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (HOST_STATUS !== 'production') globalForPrisma.prisma = db;