import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { getSiteUrl, siteConfig } from '@/lib/site'
import '@fontsource-variable/onest'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: 'design',
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: { icon: '/assets/home/logo.svg' },
  formatDetection: { address: false, email: false, telephone: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#ffffff',
}

type SiteLayoutProps = Readonly<{ children: ReactNode }>

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <html lang={siteConfig.language}>
      <body>{children}</body>
    </html>
  )
}
