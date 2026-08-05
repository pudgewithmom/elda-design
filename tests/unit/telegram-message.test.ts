import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  formatLeadMessage,
  getTelegramReadiness,
  notifyManagersOfLead,
} from '@/features/telegram/notify-managers'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('formatLeadMessage', () => {
  it('escapes user-controlled HTML and includes lead details', () => {
    const message = formatLeadMessage({
      id: 42,
      name: '<Иван>',
      phone: '+7 900 000-00-00',
      message: 'Хочу <strong>сайт</strong>',
      source: 'website',
    })

    expect(message).toContain('&lt;Иван&gt;')
    expect(message).toContain('Хочу &lt;strong&gt;сайт&lt;/strong&gt;')
    expect(message).toContain('ID заявки:</b> 42')
  })

  it('reports whether the bot and manager chats are configured', () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token')
    vi.stubEnv('TELEGRAM_MANAGER_CHAT_IDS', '101, -202')

    expect(getTelegramReadiness()).toEqual({ configured: true, managerChats: 2 })
  })

  it('delivers a notification to every configured manager chat', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token')
    vi.stubEnv('TELEGRAM_MANAGER_CHAT_IDS', '101,202')
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    const result = await notifyManagersOfLead({
      id: 42,
      name: 'Иван',
      phone: '+7 900 000-00-00',
      message: 'Нужен сайт',
      source: 'website',
    })

    expect(result).toEqual({ sent: 2, skipped: false })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
