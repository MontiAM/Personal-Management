import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@gmail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!userFound) throw new Error("Email not found");
        const matchPasword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );
        if (!matchPasword) throw new Error("Wrong password");
        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
      secret: process.env.NEXTAUTH_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {            
        const userFound = await db.user.findUnique({
          where: {
            email: user.email,
          },
        });        
        if (!userFound) {
          return "/auth/register"
        }
      }
      return true;
    },
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
