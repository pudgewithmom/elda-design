import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'

import styles from './ApproachSection.module.css'

export function ApproachSection() {
  return (
    <section className={styles.section} aria-labelledby="approach-title">
      <h2 id="approach-title" className="srOnly">
        Наш подход
      </h2>

      <Reveal className={styles.titleGraphic}>
        <Image
          src="/assets/home/approach-title.svg"
          alt=""
          aria-hidden="true"
          width={845}
          height={95}
        />
      </Reveal>

      <div className={styles.grid}>
        <div className={`${styles.cell} ${styles.cellLead}`}>
          <p>Наша команда всегда с вами на связи</p>
          <p>Нас ровно столько, чтобы закрывать задачи быстро. Никаких менеджеров среднего звена</p>
        </div>

        <Reveal className={`${styles.cell} ${styles.cardCell}`}>
          <Image
            src="/assets/home/approach-card-design.svg"
            alt="No bullshit. Just design."
            width={411}
            height={238}
            className={styles.cardGraphic}
          />
        </Reveal>

        <div className={`${styles.cell} ${styles.cellRight}`}>
          <p>
            Работа без посредников. Общаетесь напрямую с тем, кто двигает пиксели и пишет код. Мы
            сами отвечаем за результат своей головой.
          </p>
        </div>

        <div className={`${styles.cell} ${styles.cellLead}`}>
          <p>Мы используем только рабочие решения.</p>
          <p>Нам важно, чтобы сайт реально приносил заявки и работал на бизнес.</p>
        </div>

        <Reveal className={`${styles.cell} ${styles.cardCell}`} delay={0.06}>
          <Image
            src="/assets/home/approach-card-process.svg"
            alt="Process and principles"
            width={411}
            height={238}
            className={styles.cardGraphic}
          />
        </Reveal>

        <div className={`${styles.cell} ${styles.cellRight} ${styles.cellBottom}`}>
          <p>От прототипа до релиза. Сами проектируем логику.</p>
          <p>Собираем интерфейсы и запускаем готовые проекты без боли и затягивания сроков.</p>
        </div>
      </div>
    </section>
  )
}
