
// prisma/prisma.ts
import {PrismaClient} from "./generated/client";

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        errorFormat: 'pretty',
    })
}

declare global { var prisma: PrismaClient }

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma;
