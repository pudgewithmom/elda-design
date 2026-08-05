'use client'

import Script from 'next/script'
import { useActionState, useEffect, useRef } from 'react'

import { initialLeadFormState, submitLeadAction } from '@/features/leads/submit-lead-action'

import styles from './LeadForm.module.css'

export function LeadForm() {
  const [state, action, pending] = useActionState(submitLeadAction, initialLeadFormState)
  const formRef = useRef<HTMLFormElement>(null)
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
  }, [state.status])

  return (
    <form ref={formRef} action={action} className={styles.form} id="contact-form">
      <div className={styles.field}>
        <label htmlFor="lead-name">ФИО</label>
        <input id="lead-name" name="name" autoComplete="name" required />
        {state.fieldErrors?.name?.[0] ? <span>{state.fieldErrors.name[0]}</span> : null}
      </div>
      <div className={styles.field}>
        <label htmlFor="lead-phone">Телефон</label>
        <input id="lead-phone" name="phone" autoComplete="tel" inputMode="tel" required />
        {state.fieldErrors?.phone?.[0] ? <span>{state.fieldErrors.phone[0]}</span> : null}
      </div>

      <input type="hidden" name="message" value="Запрос на консультацию с главной страницы" />

      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
        </>
      ) : null}

      <label className={styles.consent}>
        <input type="checkbox" name="consent" required />
        <span>Согласен на обработку персональных данных</span>
      </label>

      <button type="submit" disabled={pending}>
        {pending ? 'Отправляем…' : 'Отправить заявку'}
      </button>

      <p className={styles.status} role="status" data-status={state.status} aria-live="polite">
        {state.message}
      </p>
    </form>
  )
}
