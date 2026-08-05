import Image from 'next/image'
import Link from 'next/link'

import styles from './SiteHeader.module.css'

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink} aria-label="EL'DA Design — главная">
        <Image
          src="/assets/home/logo.svg"
          alt="EL'DA Design"
          width={201}
          height={22}
          priority
          className={styles.logo}
        />
      </Link>
      <a className={styles.cta} href="#contact">
        get started
      </a>
    </header>
  )
}
