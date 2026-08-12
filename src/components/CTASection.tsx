import type { ReactNode } from 'react'
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
}

export default function CTASection({
  headline,
  subtext,
  buttonLabel = 'Get Started',
  buttonHref = '/contact',
  useBookSession: bookSession = false,
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
            {bookSession ? (
              <Button label={buttonLabel} onClick={openBookSession} white />
            ) : (
              <Button label={buttonLabel} href={buttonHref} white />
            )}
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
      <p className="cta-footer-copy">&copy; 2026 ShapeHaus</p>
      <a href="/" className="cta-wordmark-link">
        <img src={logos.markWhite} alt="" className="cta-footer-mark" aria-hidden="true" />
        <span className="cta-wordmark-text">ShapeHaus</span>
      </a>
      <div className="cta-footer-meta">
        <a className="cta-footer-credit" href="/privacy">
          Privacy
        </a>
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
