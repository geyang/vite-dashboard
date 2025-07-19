import prisma from './prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mongodb',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    github: {
      enabled: true,
      clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
    },
    google: {
      enabled: true,
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    },
  },
  rateLimit: {
    window: 60,
    max: 10,
  },
});
