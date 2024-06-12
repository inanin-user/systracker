'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
  
    const router = useRouter()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      if (!name || !email || !password) {
        setError("All fields are required")
        return
      }
  
      try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        })
  
        const {user} = await resUserExists.json()
  
        if (user) {
          setError("User already exists")
          return
        }
  
        const res = await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        })
  
        if (res.ok) {
          const form = e.target
          form.reset()
          router.push("/login")
  
        } else {
          console.log("User registration failed")
        }
      } catch (error) {
        console.log("Error during registration: ", error)
      }
    }
  
    return (
      <form
        className="bg-gradient-to-r from-purple-900 to-indigo-700 signup-container flex flex-col gap-3 px-4 p-5 rounded-2xl mb-5"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center text-2xl font-bold">
          <h1>Sign-Up</h1>
        </div>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
        <label>Full Name:</label>
        <input
          className="bg-zinc-100/80"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          className="bg-zinc-100/80"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          className="bg-zinc-100/80"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center mt-4">
          <button className="bg-primary-orange w-32 rounded-xl py-1">
            Signup
          </button>
        </div>
        <Link className="text-center hover:underline" href="/login">
          Back to sign-in
        </Link>
      </form>
    )
}

export default RegisterForm
