import { createClient } from "@/utils/supabase/server"
import { login, signup } from "./action"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function LoginPage() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (data?.user) {
    redirect("/")
  }

  return (
    <div>
      <form className="bg-gradient-to-r from-purple-900 to-indigo-700 login-container flex flex-col gap-3 px-4 p-5 rounded-2xl mb-5">
        <div className="flex justify-center text-2xl font-bold">
          <h1>Login</h1>
        </div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <div className="flex justify-center mt-4">
          <button
            className="bg-primary-orange w-32 rounded-xl py-1"
            type="submit"
          >
            Log in
          </button>
        </div>
        <Link className="text-center hover:underline" href="/signup">
          Sign up
        </Link>
      </form>
    </div>
  )
}
