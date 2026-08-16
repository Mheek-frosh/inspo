import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import Button from './Button'
import { logos } from '../assets/paths'
import { useBookSession } from '../context/BookSessionContext'

type CTASectionProps = {
  headline: ReactNode
  subtext?: string
  buttonLabel?: string
  buttonHref?: string
  useBookSession?: boolean
  showBookSessionButton?: boolean
}

export default function CTASection({
  headline,
  subtext,
  buttonLabel = 'Get Started',
  buttonHref = '/contact',
  useBookSession: bookSession = false,
  showBookSessionButton = false,
}: CTASectionProps) {
  const { openBookSession } = useBookSession()

  return (
    <section className="cta-section">
      <div className="cta-card">
        <ScrollReveal>
          <img
            src={logos.markBlue}
            alt=""
            className="cta-logo-mark"
            aria-hidden="true"
          />
          <div className="cta-center">
            <h2 className="cta-headline">{headline}</h2>
            {subtext && <p className="body-lg" style={{ textAlign: 'center', maxWidth: 480 }}>{subtext}</p>}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {bookSession ? (
                <Button label={buttonLabel} onClick={openBookSession} white />
              ) : (
                <Button label={buttonLabel} href={buttonHref} white />
              )}
              {showBookSessionButton && (
                <button
                  onClick={openBookSession}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'var(--electric)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Book a Session
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
      <CTAFooter />
    </section>
  )
}

export function CTAFooter() {
  return (
    <div className="cta-footer">
      <p className="cta-footer-copy">&copy; 2026 Biomusclepilates</p>
      <Link to="/" className="cta-wordmark-link">
        <img src={logos.markWhite} alt="" className="cta-footer-mark" aria-hidden="true" />
        <span className="cta-wordmark-text">Biomusclepilates</span>
      </Link>
      <div className="cta-footer-meta">
        <Link className="cta-footer-credit" to="/privacy">
          Privacy
        </Link>
      </div>
    </div>
  )
}

export function StandaloneFooter() {
  return (
    <div className="footer-standalone">
      <CTAFooter />
    </div>
  )
}
