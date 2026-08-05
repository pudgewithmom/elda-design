export type LeadNotification = {
  id: number | string
  name: string
  phone?: string | null
  email?: string | null
  telegramUsername?: string | null
  message: string
  pageUrl?: string | null
  source?: string | null
}

export type TelegramNotificationResult = {
  sent: number
  skipped: boolean
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function formatLeadMessage(lead: LeadNotification): string {
  const contacts = [
    lead.phone && `<b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    lead.email && `<b>Email:</b> ${escapeHtml(lead.email)}`,
    lead.telegramUsername && `<b>Telegram:</b> ${escapeHtml(lead.telegramUsername)}`,
  ].filter(Boolean)

  return [
    '<b>Новая заявка EL\'DA</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    ...contacts,
    `<b>Источник:</b> ${escapeHtml(lead.source ?? 'website')}`,
    '',
    '<b>Сообщение:</b>',
    escapeHtml(lead.message),
    lead.pageUrl ? `\n<b>Страница:</b> ${escapeHtml(lead.pageUrl)}` : '',
    `\n<b>ID заявки:</b> ${escapeHtml(String(lead.id))}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function getManagerChatIds(): string[] {
  return (process.env.TELEGRAM_MANAGER_CHAT_IDS ?? '')
    .split(',')
    .map((chatId) => chatId.trim())
    .filter(Boolean)
}

export async function notifyManagersOfLead(
  lead: LeadNotification,
): Promise<TelegramNotificationResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatIds = getManagerChatIds()

  if (!token || chatIds.length === 0) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Telegram notification environment is not configured.')
    }

    return { sent: 0, skipped: true }
  }

  const message = formatLeadMessage(lead)
  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`

  const results = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(`Telegram API returned ${response.status}.`)
      }
    }),
  )

  const rejected = results.filter((result) => result.status === 'rejected')
  if (rejected.length > 0) {
    throw new AggregateError(
      rejected.map((result) => result.reason),
      `Telegram notification failed for ${rejected.length} manager chat(s).`,
    )
  }

  return { sent: results.length, skipped: false }
}
