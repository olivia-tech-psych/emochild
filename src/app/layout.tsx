import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Emotionagotchi',
  description: 'Your emotional wellness companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
