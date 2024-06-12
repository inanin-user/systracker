import Nav from "@/components/Nav"
import "@/styles/globals.css"
import Providers, { AuthProvider } from "./Providers"
import { createClient } from "@/utils/supabase/server"
import { useSession } from "next-auth/react"

export const metadata = {
  title: "SysTracker",
  description: "Track CUST Link System data",
  icons: {
    icon: "/assets/icons/favicon.ico",
  },
}

export default async function RootLayout({ children }) {
  // const supabase = createClient()
  // const { data, error } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <main className="app">
              <Nav/>
              {children}
            </main>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
