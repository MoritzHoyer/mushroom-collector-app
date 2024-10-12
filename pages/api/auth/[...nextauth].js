import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GithubProvider({
      clientId:
        process.env.NODE_ENV === "development"
          ? process.env.GITHUB_ID_LOCAL
          : process.env.GITHUB_ID,
      clientSecret:
        process.env.NODE_ENV === "development"
          ? process.env.GITHUB_SECRET_LOCAL
          : process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: "profile email",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
