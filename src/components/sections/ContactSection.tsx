import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'

import { LeadForm } from './LeadForm'
import styles from './ContactSection.module.css'

const contacts = [
  { label: 'telegram', icon: '/assets/home/icon-telegram.svg' },
  { label: 'whatsapp', icon: '/assets/home/icon-whatsapp.svg' },
] as const

export function ContactSection() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={styles.frame}>
        <div className={styles.date}>05.08.2026</div>
        <Reveal className={styles.heading}>
          <h2 id="contact-title" className="srOnly">
            Свяжись с нами
          </h2>
          <Image
            src="/assets/home/contact-title.svg"
            alt=""
            aria-hidden="true"
            width={827}
            height={95}
          />
        </Reveal>

        <div className={styles.body}>
          <div className={styles.visual}>
            <Image
              src="/assets/home/contact-image.png"
              alt="Абстрактная черно-белая бумажная композиция"
              fill
              sizes="(max-width: 800px) 100vw, 36vw"
              className={styles.contactImage}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.copyGrid}>
              <p>Обсудим ваш проект, зафиксируем цели и предложим сильное решение.</p>
              <p>Бесплатно проконсультируем и поможем выбрать вектор развития.</p>
            </div>

            <div className={styles.actions}>
              <LeadForm />
              <address className={styles.contacts}>
                {contacts.map((contact) => (
                  <div key={contact.label} className={styles.contactRow}>
                    <span>{contact.label}</span>
                    <Image src={contact.icon} alt="" width={24} height={24} />
                  </div>
                ))}
                <a className={styles.contactRow} href="mailto:hello_elda@yandex.ru">
                  <span>hello_elda@yandex.ru</span>
                  <Image src="/assets/home/icon-email.svg" alt="" width={24} height={24} />
                </a>
              </address>
            </div>
          </div>
        </div>

        <p className={styles.motto}>Structure. Order. Intent.</p>
      </div>
    </section>
  )
}
