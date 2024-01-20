import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agents and Ticket",
  description:
    "Ease your operations in bussiness with handling your agents and tickets at one place",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
