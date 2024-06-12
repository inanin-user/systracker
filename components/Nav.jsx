"use client"
import { logout } from "@/app/logout/actions"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BsArrowRight, BsPersonCircle } from "react-icons/bs"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 sticky top-0 bg-background-blue">
      <Link href="/" className="flex gap-3 flex-center">
        <Image
          src="/assets/images/inanin_orange2.png"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text mt-[2px]">SysTracker</p>
      </Link>

      {/* Desktop Navigation */}
      <div>
        {session?.user ? (
          <div className="relative flex gap-3 md:gap-5">
            <BsPersonCircle
              style={{ width: "37px", height: "37px" }}
              className="cursor-pointer"
              onClick={() => {
                setToggleDropdown(true)
              }}
            />

            <div
              className={`transition-opacity ${
                toggleDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
              } text-white`}
            >
              <div
                className="fixed inset-0"
                onClick={() => setToggleDropdown(false)}
              ></div>
              <div
                style={{
                  top: "60px",
                  right: "0px", // Adjust this as needed
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                }}
                className={`absolute w-52 rounded-xl bg-navy`}
              >
                <div
                  className="flex-col text-center py-2"
                >
                  <h2 className="mt-1">{session.user.name}</h2>
                  <h2 className="mt-1">{session.user.email}</h2>
                </div>
                <hr></hr>
                <div
                  className={`flex cursor-pointer pt-3 pb-2 hover:bg-dark-orange rounded-b-xl`}
                  style={{ justifyContent: "space-around" }}
                  // onClick={() => logout()}
                  onClick={() => signOut()}
                >
                  <BsArrowRight className="text-3xl" />
                  <h2 className="mr-5">Logout</h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link className="white_btn" href="/login">
              Sign In
            </Link>
            {/* <LoginLink className="white_btn">Sign in</LoginLink> */}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
