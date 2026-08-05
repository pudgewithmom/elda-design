type TurnstileResponse = {
  success: boolean
  hostname?: string
  'error-codes'?: string[]
}

export async function verifyTurnstile(token?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('TURNSTILE_SECRET_KEY is required in production.')
    }

    return true
  }

  if (!token) return false

  const body = new URLSearchParams({ secret, response: token })
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
    cache: 'no-store',
  })

  if (!response.ok) return false

  const result = (await response.json()) as TurnstileResponse
  return result.success
}
