import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'

import styles from './ServicesSection.module.css'

const motionTags = ['video editing', 'motion design']
const designTags = ['promotion', 'ux/ui', 'web design', 'graphic design']

export function ServicesSection() {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <h2 id="services-title" className="srOnly">
        Направления работы
      </h2>
      <div className={styles.grid}>
        <Reveal className={styles.column}>
          <div className={styles.tags}>
            {motionTags.map((tag) => (
              <span key={tag} className={`${styles.tag} ${styles.tagDark}`}>
                {tag}
              </span>
            ))}
          </div>
          <article className={styles.card}>
            <Image
              src="/assets/home/services-motion.png"
              alt="Абстрактная темная композиция для motion design"
              fill
              sizes="(max-width: 800px) 100vw, 46vw"
              className={styles.image}
              priority
            />
            <p className={`${styles.caption} ${styles.captionLight}`}>
              Visual magnetism. Your product in motion.
            </p>
          </article>
        </Reveal>

        <Reveal className={styles.column} delay={0.08}>
          <div className={`${styles.tags} ${styles.tagsEnd}`}>
            {designTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <article className={styles.card}>
            <Image
              src="/assets/home/services-design.png"
              alt="Стеклянная абстрактная конструкция для направления web design"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              className={`${styles.image} ${styles.rotatedImage}`}
              priority
            />
            <p className={styles.caption}>Aesthetics and conversion</p>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
