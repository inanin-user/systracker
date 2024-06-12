import LoginForm from "@/components/LoginForm"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }
  return <LoginForm />
}
