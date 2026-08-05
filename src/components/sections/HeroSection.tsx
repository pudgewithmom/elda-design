import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'

import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.statement}>
        <Reveal className={styles.titleWrap}>
          <h1 id="hero-title" className={styles.title}>
            Дизайн,
            <br />
            работающий на ваш
          </h1>
          <Image
            src="/assets/home/hero-script-business.svg"
            alt="бизнес"
            width={585}
            height={182}
            className={styles.script}
            priority
          />
        </Reveal>
        <Reveal className={styles.description} delay={0.08}>
          <p>
            Создаем визуальные решения, которые привлекают внимание, отстраивают от конкурентов и
            помогают продавать.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
