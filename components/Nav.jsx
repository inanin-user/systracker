"use client"
import { logout } from "@/app/logout/actions"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BsArrowRight, BsPersonCircle } from "react-icons/bs"

const Nav = ({ data }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false)

  console.log(data)
  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-3 flex-center">
        <Image
          src="/assets/images/inanin_orange2.png"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">SysTracker</p>
      </Link>

      {/* Desktop Navigation */}
      <div>
        {data.user ? (
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
                  className="flex mt-3 mb-3"
                  style={{ justifyContent: "space-evenly" }}
                >
                  <h2 className="mt-1">{data.user.email}</h2>
                </div>
                <hr></hr>
                <div
                  className={`flex cursor-pointer pt-3 pb-2 hover:bg-dark-orange rounded-b-xl`}
                  style={{ justifyContent: "space-around" }}
                  onClick={() => logout()}
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
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
