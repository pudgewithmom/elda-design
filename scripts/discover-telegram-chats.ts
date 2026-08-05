import { discoverTelegramChatIds } from '../src/features/telegram/notify-managers'

try {
  const chats = await discoverTelegramChatIds()

  if (chats.length === 0) {
    console.log('No chats found. Ask every manager to open the bot and send /start, then retry.')
  } else {
    console.log('Available Telegram chat IDs:')
    for (const chat of chats) console.log(`${chat.id} (${chat.type})`)
  }
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown Telegram error.'
  console.error(message)
  process.exitCode = 1
}
