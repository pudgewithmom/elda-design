import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'

import styles from './CasesSection.module.css'

type CaseItem = {
  slug: string
  logo: string
  logoWidth: number
  logoHeight: number
  title: string
  description: string
  number?: string
  image?: string
}

const cases: readonly CaseItem[] = [
  {
    slug: 'iimali-design',
    logo: '/assets/home/case-iimali-logo.svg',
    logoWidth: 172,
    logoHeight: 19,
    title: 'Сайт студии интерьеров',
    description:
      'Спроектировали сайт так, чтобы пользователь мог быстро найти нужный тип интерьера и без лишних кликов перейти к просмотру работ.',
    number: '/assets/home/case-number-1.svg',
  },
  {
    slug: 'arc-store',
    logo: '/assets/home/case-arc-logo.svg',
    logoWidth: 171,
    logoHeight: 18,
    title: 'Магазин цифровых товаров',
    description:
      'Сделали удобный сайт, где геймеры могут купить игровые предметы, оружие или заказать прокачку.',
    number: '/assets/home/case-number-2.svg',
  },
  {
    slug: 'bowshock',
    logo: '/assets/home/case-bowshock-logo.svg',
    logoWidth: 171,
    logoHeight: 18,
    title: 'Скейтерское сообщество',
    description:
      'Сделали большой сайт, в котором уместили перепись скейтеров, соцсеть и маркетплейс.',
    image: '/assets/home/case-bowshock.png',
  },
]

export function CasesSection() {
  return (
    <section className={styles.section} aria-labelledby="cases-title">
      <Reveal className={styles.heading}>
        <h2 id="cases-title" className="srOnly">
          Наши кейсы
        </h2>
        <Image
          src="/assets/home/cases-title.svg"
          alt=""
          aria-hidden="true"
          width={845}
          height={95}
        />
      </Reveal>

      <div className={styles.list}>
        {cases.map((item, index) => (
          <Reveal key={item.slug} className={styles.caseRow} delay={index * 0.04}>
            <div className={`${styles.media} ${item.number ? styles.mediaBlue : ''}`}>
              {item.number ? (
                <Image
                  src={item.number}
                  alt={`Кейс ${index + 1}`}
                  width={40}
                  height={179}
                  className={styles.number}
                />
              ) : (
                <Image
                  src={item.image ?? ''}
                  alt="Фотография скейт-парка BowShock"
                  fill
                  sizes="(max-width: 800px) 100vw, 70vw"
                  className={styles.caseImage}
                />
              )}
            </div>

            <article className={styles.details}>
              <div>
                <Image
                  src={item.logo}
                  alt=""
                  aria-hidden="true"
                  width={item.logoWidth}
                  height={item.logoHeight}
                  className={styles.caseLogo}
                />
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
              <a
                href="#contact"
                className={styles.learnMore}
                aria-label={`Обсудить проект уровня ${item.title}`}
              >
                learn more
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
