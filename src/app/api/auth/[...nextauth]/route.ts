import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // CredentialsProvider({
    //   id: "credentials",
    //   name: "Credentials",
    // }),
  ],
});

export { handler as GET, handler as POST };
