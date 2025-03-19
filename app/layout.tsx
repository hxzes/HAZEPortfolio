import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HAZE Design | Tvorba firemných webov a digitálnych riešení",
  description:
    "Profesionálna tvorba firemných webov, e-shopov a digitálnych riešení. Moderný dizajn, responzívne webové stránky a UX/UI optimalizácia pre váš biznis.",
  keywords: [
    "tvorba firemných webov",
    "webové stránky pre firmy",
    "tvorba e-shopov",
    "webdizajn",
    "responzívne webové stránky",
    "UX/UI dizajn",
    "digitálne riešenia",
  ],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://haze.sk",
    siteName: "HAZE Design",
    title: "HAZE Design | Tvorba firemných webov a digitálnych riešení",
    description:
      "Profesionálna tvorba firemných webov, e-shopov a digitálnych riešení. Moderný dizajn, responzívne webové stránky a UX/UI optimalizácia pre váš biznis.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HAZE Design Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAZE Design | Tvorba firemných webov a digitálnych riešení",
    description:
      "Profesionálna tvorba firemných webov, e-shopov a digitálnych riešení. Moderný dizajn, responzívne webové stránky a UX/UI optimalizácia pre váš biznis.",
    images: ["/images/og-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk">
      <head>
        {/* Additional meta tags for better social media sharing */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'