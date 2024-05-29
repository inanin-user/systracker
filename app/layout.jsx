import Nav from "@/components/Nav"
import "@/styles/globals.css"
import Providers from "./Providers"

export const metadata = {
  title: "SysTracker",
  description: "Track CUST Link System data",
  icons: {
    icon: "/assets/icons/favicon.ico"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <main className="app">
          <Nav />
          {children}
        </main>
        </Providers>
      </body>
    </html>
  )
}
