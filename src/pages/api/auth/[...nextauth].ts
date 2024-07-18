import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/prisma/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
  session: { 
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile){
        return({
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role? profile.role: "admin"
        })
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile){
        return({
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role? profile.role: "admin"
        })
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT CALLBACK", token, user)
        return { ...token, ...user }
    },
    async session({ session, token }) {
        session.user.role = token.role;
      console.log("SESSION CALLBACK", session, token)
        return session;
    }
  },
  secret: process.env.JWT_SECRET,
}
export default NextAuth(authOptions)