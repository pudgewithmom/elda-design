import { describe, expect, it } from 'vitest'

import { formatLeadMessage } from '@/features/telegram/notify-managers'

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
})
