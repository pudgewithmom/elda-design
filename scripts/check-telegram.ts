import { verifyTelegramSetup } from '../src/features/telegram/notify-managers'

const sendTest = process.argv.includes('--send-test')

try {
  const result = await verifyTelegramSetup({ sendTest })
  const bot = result.botUsername ? `@${result.botUsername}` : result.botName

  console.log(`Telegram bot ${bot} is available.`)
  console.log(`Manager chats verified: ${result.managerChats}.`)
  if (result.testSent) console.log('Test notification sent successfully.')
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown Telegram error.'
  console.error(message)
  process.exitCode = 1
}
