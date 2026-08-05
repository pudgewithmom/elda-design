import { expect, test } from '@playwright/test'

test('health endpoint is available', async ({ request }) => {
  const response = await request.get('/api/health')

  expect(response.ok()).toBe(true)
  const body = await response.json()

  expect(['ok', 'degraded']).toContain(body.status)
  expect(body).toMatchObject({
    service: 'elda-design',
    checks: { database: { status: 'up' } },
  })
})
