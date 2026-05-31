import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { cleanEnv } from "./lib/env";
import { getAccountByUserId, getUserById } from "@/features/auth/action/queries";

export const { auth, handlers, signIn, signOut } = NextAuth({
  logger: {
    error(error) {
      console.error("[auth][error]", error);
    },
    warn(message) {
      console.warn("[auth][warn]", message);
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      void user;
      void account;

      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      if (existingAccount?.provider) {
        token.provider = existingAccount.provider;
      }

      token.name = existingUser.name ?? token.name;
      token.email = existingUser.email ?? token.email;
      token.role = existingUser.role;

      return token;
    },

    async session({ session, token }) {
      // Attach the user ID from the token to the session
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as typeof session.user.role;
      }

      return session;
    },
  },
  
  secret: cleanEnv(process.env.AUTH_SECRET),
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})