import { ImageResponse } from 'next/og'

import { siteConfig } from '@/lib/site'

export const alt = `${siteConfig.name} — дизайн, работающий на бизнес`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'flex-end',
        background: '#ffffff',
        color: '#0a0a0a',
        display: 'flex',
        fontSize: 88,
        fontWeight: 700,
        height: '100%',
        letterSpacing: '-0.06em',
        lineHeight: 0.92,
        padding: 64,
        position: 'relative',
        textTransform: 'uppercase',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', maxWidth: 920 }}>Дизайн, работающий на ваш бизнес</div>
      <div
        style={{
          background: '#3045be',
          borderRadius: 999,
          color: '#ffffff',
          display: 'flex',
          fontSize: 28,
          letterSpacing: '0.08em',
          padding: '14px 24px',
          position: 'absolute',
          right: 64,
          top: 64,
        }}
      >
        EL&apos;DA
      </div>
    </div>,
    size,
  )
}
