"use client"
import { SWRConfig } from "swr"
import fetcher from "@/app/services/fetcher"

export default function Providers({ children }) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}
