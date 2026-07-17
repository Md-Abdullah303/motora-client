import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Motora - AI-Powered Car Marketplace",
  description:
    "Find your perfect drive with Motora. An AI-powered marketplace that learns your preferences and finds the ideal car.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#121D2F",
              color: "#f3f4f6",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#00D2FF",
                secondary: "#0A111E",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#0A111E",
              },
            },
          }}
        />
      </body>
    </html>
  )
}
