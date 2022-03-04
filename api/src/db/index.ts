import { PrismaClient } from '.prisma/client';

export const getMyPrismaClient = async () => {
  const client = new PrismaClient();
  return client;
};
