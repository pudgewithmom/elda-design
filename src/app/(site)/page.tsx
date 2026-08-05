import { createMetadata } from '@/lib/seo/create-metadata'

import styles from './page.module.css'

export const metadata = createMetadata()

export default function HomePage() {
  return (
    <main className={styles.main}>
      <p className={styles.eyebrow}>EL&apos;DA Design</p>
      <h1 className={styles.title}>Основа проекта готова к реализации макета</h1>
      <p className={styles.copy}>
        Публичный сайт, CMS, SEO и контур обработки заявок разделены на независимые модули.
      </p>
    </main>
  )
}
