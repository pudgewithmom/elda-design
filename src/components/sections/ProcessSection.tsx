import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'

import styles from './ProcessSection.module.css'

const stages = ['Аудит и бриф', 'Прототип и UX', 'Дизайн и верстка', 'Поддержка и рост']

export function ProcessSection() {
  return (
    <section className={styles.section} aria-labelledby="process-title">
      <Reveal className={styles.banner}>
        <Image
          src="/assets/home/support-image.png"
          alt="Абстрактная черная архитектурная поверхность"
          fill
          sizes="100vw"
          className={styles.bannerImage}
        />
        <p>From concept to solid launch</p>
      </Reveal>

      <Reveal className={styles.heading}>
        <h2 id="process-title" className="srOnly">
          Этапы и поддержка
        </h2>
        <Image
          src="/assets/home/support-title.svg"
          alt=""
          aria-hidden="true"
          width={845}
          height={95}
        />
      </Reveal>

      <p className={styles.intro}>
        Прозрачный пайплайн: фиксируем сроки на старте, берем на себя всю техническую рутину и
        остаемся на связи после релиза.
      </p>

      <div className={styles.content}>
        <div aria-hidden="true" />
        <div className={styles.stages}>
          <h3>Этапы</h3>
          <ol>
            {stages.map((stage) => (
              <li key={stage}>{stage}</li>
            ))}
          </ol>
        </div>
        <p className={styles.description}>
          Постоянное сопровождение и развитие проекта. После запуска мы не оставляем вас один на
          один с сайтом. Контролируем стабильность работы, оперативно вносим правки, добавляем новые
          разделы и помогаем масштабировать функционал по мере роста бизнеса.
        </p>
      </div>
    </section>
  )
}
