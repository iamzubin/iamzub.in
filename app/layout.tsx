import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Gaegu, EB_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from 'sonner'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'Zubin Choudhary',
  description:
    "Let's build a better internet.",
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const gaegu = Gaegu({
  weight: ['400', '700'],
  variable: '--font-gaegu',
  subsets: ['latin'],
})

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${gaegu.variable} ${ebGaramond.variable} bg-notebook-bg text-[#1a1a1a] tracking-tight antialiased dark:bg-dark-bg dark:text-dark-text font-gaegu notebook-margins`}
      >
        <div className="bg-notebook fixed inset-0 z-0 opacity-60 pointer-events-none" />
        <div className="bg-noise fixed inset-0 z-50 mix-blend-multiply opacity-[0.03] pointer-events-none dark:mix-blend-soft-light" />
        <Analytics />
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="light"
        >
          <div className="relative z-10 flex min-h-screen w-full flex-col selection:bg-fumayo-yellow selection:text-black">
            <div className="relative mx-auto w-full max-w-5xl flex-1 px-10 md:px-24 pt-12 md:pt-24">
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <Toaster richColors closeButton position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
