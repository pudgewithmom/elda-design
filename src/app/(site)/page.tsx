import { SiteHeader } from '@/components/layout/SiteHeader'
import { ApproachSection } from '@/components/sections/ApproachSection'
import { CasesSection } from '@/components/sections/CasesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { createMetadata } from '@/lib/seo/create-metadata'

import styles from './page.module.css'

export const metadata = createMetadata()

export default function HomePage() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <ApproachSection />
        <CasesSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </div>
  )
}
