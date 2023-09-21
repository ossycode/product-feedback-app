import type { NextAuthOptions, Session } from "next-auth";
import GitHubProviders from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import User from "@/lib/models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProviders({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      // id: "credentials",
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials, req) {
        const { username, password } = credentials!;

        try {
          await connectToDB();
          const user = await User.findOne({ username });

          if (!user) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return null;
          }

          return user;
        } catch (error: any) {
          console.log("Login Error: ", error);

          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }): Promise<Session> {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user?.email });
      session.user.id = sessionUser._id.toString();
      session.user.username = sessionUser.username.toString();

      return session;
    },
  },

  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60, // 3 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};