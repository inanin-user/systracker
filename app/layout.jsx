import Nav from "@/components/Nav"
import "@/styles/globals.css"
import Providers from "./Providers"
import { createClient } from "@/utils/supabase/server"

export const metadata = {
  title: "SysTracker",
  description: "Track CUST Link System data",
  icons: {
    icon: "/assets/icons/favicon.ico",
  },
}

export default async function RootLayout({ children }) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body>
        
        <Providers>
          <main className="app">
          <Nav data={data} />
            {children}
            </main>
        </Providers>
      </body>
    </html>
  )
}
