import config from '@payload-config'
import { getPayload } from 'payload'

import { getTelegramReadiness } from '@/features/telegram/notify-managers'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const telegram = getTelegramReadiness()
  const base = {
    service: 'elda-design',
    timestamp: new Date().toISOString(),
    checks: {
      telegram: {
        status: telegram.configured ? 'configured' : 'not_configured',
        managerChats: telegram.managerChats,
      },
    },
  }

  try {
    const payload = await getPayload({ config })
    await payload.count({ collection: 'leads', overrideAccess: true })

    return Response.json(
      {
        ...base,
        status: telegram.configured ? 'ok' : 'degraded',
        checks: { database: { status: 'up' }, ...base.checks },
      },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch {
    return Response.json(
      {
        ...base,
        status: 'error',
        checks: { database: { status: 'down' }, ...base.checks },
      },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
