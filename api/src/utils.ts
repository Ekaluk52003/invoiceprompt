import { PrismaClient } from '@prisma/client';
import Argon from 'argon2';
import { ISession } from './interface';

const prisma = new PrismaClient();

export const hashPassword = async (password: string) => {
  const hashedPassword = await Argon.hash(password);
  return hashedPassword;
};

export const verifyPassword = async (
  inputPassword: string,
  passwordHash: string,
) => {
  const isCorrect = await Argon.verify(passwordHash, inputPassword);
  return isCorrect;
};

export const isProd = () => process.env.NODE_ENV === 'production';

export const isAuthenticated = (session: ISession): boolean => {
  if (session.userId) {
    return true;
  }
  return false;
};






export const isAdmin = async (session: ISession): Promise<boolean> => {
  const admin = await prisma.user.findUnique({
    where:{
      id:session.userId
    }
  })

  if (admin?.role.includes("ADMIN")) {
    return true;
  }
  return false;
};


