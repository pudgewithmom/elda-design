import type { Metadata } from 'next'

import { getSiteUrl, siteConfig } from '@/lib/site'

type CreateMetadataInput = {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image,
  noIndex = false,
}: CreateMetadataInput = {}): Metadata {
  const canonical = new URL(path, getSiteUrl())

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: title ?? siteConfig.name,
      description,
      url: canonical,
      images: image ? [{ url: image, width: 1200, height: 630, alt: siteConfig.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? siteConfig.name,
      description,
      images: image ? [image] : undefined,
    },
  }
}
