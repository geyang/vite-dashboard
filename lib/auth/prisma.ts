import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
   return new PrismaClient({
      datasources: {
         db: {
            url: import.meta.env.VITE_DATABASE_URL
         }
      },
      log: ['query', 'error', 'warn']
   });
};

declare const globalThis: {
   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (!import.meta.env.PROD) globalThis.prismaGlobal = prisma;
