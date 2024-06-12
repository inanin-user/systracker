'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const LoginForm = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    try {
      const res = await signIn("credentials", {
        email, 
        password, 
        redirect: false
      })

      if (res.error) {
        console.error("SignIn Error:", res.error)
        setError(res.error)
        return
      }

      router.replace("/")

    } catch (error) {
      console.error("Unexpected Error:", error)
      setError("Unexpected error occurred")
    }
  }

  return (
    <div>
      <form
        className="bg-gradient-to-r from-purple-900 to-indigo-700 login-container flex flex-col gap-3 px-4 p-5 rounded-2xl mb-5"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center text-2xl font-bold">
          <h1>Login</h1>
        </div>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
        <label>Email:</label>
        <input ref={emailRef} type="text" />
        <label>Password:</label>
        <input ref={passwordRef} type="password" />
        <div className="flex justify-center mt-4">
          <button className="bg-primary-orange w-32 rounded-xl py-1">
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

export default LoginForm