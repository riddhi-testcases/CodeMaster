import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CodeMaster AI - Professional Code Editor & Learning Platform",
  description:
    "Advanced AI-powered code editor with real-time execution, intelligent analysis, and collaborative learning features.",
  keywords: "code editor, programming, AI, learning, IDE, Monaco Editor",
  authors: [{ name: "CodeMaster AI Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">{children}</div>
      </body>
    </html>
  )
}
