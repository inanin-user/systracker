"use client"
import { SWRConfig } from "swr"
import fetcher from "@/app/services/fetcher"
import { SessionProvider } from "next-auth/react"

export default function Providers({ children }) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
