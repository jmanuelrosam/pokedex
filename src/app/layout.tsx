import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Pokedex by Factofly',
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
