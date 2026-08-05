import config from '@payload-config'
import { getPayload } from 'payload'

import { createLead } from '../src/features/leads/create-lead'

let testLeadId: number | string | undefined

try {
  const payload = await getPayload({ config })
  await payload.count({ collection: 'leads', overrideAccess: true })

  const lead = await createLead({
    name: 'Infrastructure smoke test',
    phone: '+7 000 000-00-00',
    email: '',
    telegramUsername: '',
    message: 'Automated website lead, PostgreSQL and Payload integration check.',
    consent: true,
    pageUrl: 'http://localhost:3000/',
    utmSource: 'infrastructure-check',
    utmMedium: '',
    utmCampaign: '',
  })
  testLeadId = lead.id

  const storedLead = await payload.findByID({
    collection: 'leads',
    id: lead.id,
    overrideAccess: true,
  })

  if (!['sent', 'skipped'].includes(storedLead.telegramNotificationStatus)) {
    throw new Error(
      `Unexpected Telegram delivery status: ${storedLead.telegramNotificationStatus}.`,
    )
  }

  console.log('PostgreSQL connection: OK')
  console.log('Payload create/read hooks: OK')
  console.log(`Telegram hook status: ${storedLead.telegramNotificationStatus}`)

  await payload.delete({ collection: 'leads', id: lead.id, overrideAccess: true })
  testLeadId = undefined
  await payload.destroy()
  process.exit(0)
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown infrastructure error.'
  console.error(message)

  if (testLeadId !== undefined) {
    try {
      const payload = await getPayload({ config })
      await payload.delete({ collection: 'leads', id: testLeadId, overrideAccess: true })
      await payload.destroy()
    } catch {
      console.error(`Could not remove smoke-test lead ${testLeadId}.`)
    }
  }

  process.exit(1)
}
