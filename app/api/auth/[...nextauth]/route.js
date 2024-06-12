import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials

        try {
          await connectMongoDB()
          const user = await User.findOne({ email })
          if (!user) {
            console.log("No user found with email:", email)
            throw new Error("No user found with this email")
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            console.log("Password does not match for user:", email)
            throw new Error("Password does not match")
          }

          return user

        } catch (error) {
          console.log("Error in authorize function:", error)
          throw new Error("Authorization failed")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }