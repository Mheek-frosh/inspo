import { useEffect } from 'react'
import ArrowIcon from './ArrowIcon'
import { useBookSession } from '../context/BookSessionContext'

export default function BookSessionModal() {
  const { isOpen, closeBookSession } = useBookSession()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBookSession()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeBookSession])

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-session-title"
      onClick={closeBookSession}
    >
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={closeBookSession}
        >
          ×
        </button>
        <p className="eyebrow">Biomusclepilates</p>
        <h2 id="book-session-title">Book a Session</h2>
        <p className="body">
          Tell us what you&apos;d like to work on — strength, core development,
          pelvic stability, posture, or overall movement — and we&apos;ll match
          you with the right program.
        </p>
        <form
          className="modal-form contact-form"
          action="https://formsubmit.co/hello@shapehaus.com"
          method="POST"
          onSubmit={closeBookSession}
        >
          <input type="hidden" name="_subject" value="Book a Session — Biomusclepilates" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <div className="form-group">
            <label className="form-label" htmlFor="book-name">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              id="book-name"
              name="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="book-email">
              Email
            </label>
            <input
              className="form-input"
              type="email"
              id="book-email"
              name="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="book-phone">
              Phone
            </label>
            <input
              className="form-input"
              type="tel"
              id="book-phone"
              name="phone"
              placeholder="Your phone number"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="book-goals">
              What would you like to improve?
            </label>
            <textarea
              className="form-textarea"
              id="book-goals"
              name="goals"
              placeholder="Strength, core, pelvic stability, posture, mobility..."
              rows={4}
              required
            />
          </div>
          <button type="submit" className="btn">
            <span className="btn-label">
              <span className="btn-text-top">Book Session</span>
              <span className="btn-text-bottom">Book Session</span>
            </span>
            <span className="btn-icon">
              <ArrowIcon />
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}

export function FloatingBookButton() {
  const { openBookSession } = useBookSession()

  return (
    <button type="button" className="floating-book" onClick={openBookSession}>
      Book a Session
    </button>
  )
}
