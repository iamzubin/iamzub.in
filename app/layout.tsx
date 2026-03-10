import type { Metadata, Viewport } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from 'sonner'
import { Footer } from './footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
}

export const metadata: Metadata = {
  title: 'Zubin Choudhary // SYSTEM_UPLINK',
  description:
    "Software Engineer specializing in dApps, Smart Contracts, and Technical Design.",
}

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistMono.variable} font-mono bg-zinc-950 text-zinc-100 antialiased grid-bg min-h-screen selection:bg-green-500/30 selection:text-green-200`}
      >
        <Analytics />
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
          forcedTheme="dark"
        >
          <div className="relative mx-auto w-full max-w-screen-xl px-4 py-8 md:py-16">
            {children}
            <Footer />
          </div>
          <Toaster richColors closeButton position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
