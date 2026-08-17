import { useEffect, useState } from 'react'

export const bookingUrl = 'https://biomusclepilates.breely.com/form/22140'

type BreelyDataLayerItem = {
  event?: string
  [key: string]: unknown
}

export default function BookSessionModal() {
  const [bookingComplete, setBookingComplete] = useState(false)

  useEffect(() => {
    let closeTimer: number | undefined
    let lastConfirmationAt = 0

    const showConfirmation = () => {
      const now = Date.now()
      if (now - lastConfirmationAt < 500) return
      lastConfirmationAt = now
      setBookingComplete(true)
      closeTimer = window.setTimeout(() => setBookingComplete(false), 6000)
    }

    const bookingWindow = window as Window & { dataLayer?: BreelyDataLayerItem[] }
    const dataLayer = bookingWindow.dataLayer ?? []
    bookingWindow.dataLayer = dataLayer
    const originalPush = dataLayer.push.bind(dataLayer)
    const trackedPush = (...items: BreelyDataLayerItem[]) => {
      items.forEach((item) => {
        if (item?.event === 'breely_form_submitted') showConfirmation()
      })
      return originalPush(...items)
    }
    dataLayer.push = trackedPush

    dataLayer.forEach((item) => {
      if (item?.event === 'breely_form_submitted') showConfirmation()
    })

    window.addEventListener('breely_form_submitted', showConfirmation)
    document.addEventListener('breely_form_submitted', showConfirmation)

    return () => {
      window.removeEventListener('breely_form_submitted', showConfirmation)
      document.removeEventListener('breely_form_submitted', showConfirmation)
      if (dataLayer.push === trackedPush) dataLayer.push = originalPush
      if (closeTimer) window.clearTimeout(closeTimer)
    }
  }, [])

  if (!bookingComplete) return null

  return (
    <div
      className="booking-success-overlay"
      role="status"
      aria-live="polite"
      onClick={() => setBookingComplete(false)}
    >
      <div className="booking-success-card" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="booking-success-close"
          aria-label="Close confirmation"
          onClick={() => setBookingComplete(false)}
        >
          &times;
        </button>
        <div className="booking-success-mark" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" />
            <path d="M19 33.5 28 42l18-20" />
          </svg>
        </div>
        <p className="eyebrow">Booking confirmed</p>
        <h2>You&apos;re all booked!</h2>
        <p className="body">
          Your session date and time have been saved. A confirmation copy is on its way to
          your email.
        </p>
      </div>
    </div>
  )
}

export function FloatingBookButton() {
  return (
    <a
      id="breely-booking-trigger"
      href={bookingUrl}
      className="floating-book breely-popup-trigger"
      data-url={bookingUrl}
    >
      Book a Session
    </a>
  )
}
