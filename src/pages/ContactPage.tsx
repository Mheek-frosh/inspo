import ArrowIcon from '../components/ArrowIcon'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import StripeWrap from '../components/StripeWrap'
import CTASection from '../components/CTASection'
import { images } from '../assets/paths'
import { useHeroLoaded } from '../hooks/useSiteEffects'
import { useBookSession } from '../context/BookSessionContext'

type ContactPageProps = {
  heroLoaded: boolean
  splashActive: boolean
}

export default function ContactPage({
  heroLoaded,
  splashActive,
}: ContactPageProps) {
  const { openBookSession } = useBookSession()
  const pageHeroLoaded = useHeroLoaded(splashActive ? 1600 : 50)

  const heroClass = [
    'contact-hero',
    heroLoaded || pageHeroLoaded ? 'hero-loaded' : '',
    splashActive ? 'splash-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <section className={heroClass} data-nav-theme="dark">
        <div className="contact-hero-photo">
          <img src={images.people} alt="Start your strength journey" />
        </div>
        <div className="contact-hero-text">
          <h1>Let&apos;s Start Your Journey.</h1>
          <button
            onClick={openBookSession}
            style={{
              marginTop: '1.5rem',
              padding: '0 24px',
              backgroundColor: 'var(--electric)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: '600',
              letterSpacing: '2px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'uppercase',
            }}
          >
            Book a Session
          </button>
        </div>
        <div className="animated-stripe" />
      </section>

      <StripeWrap />

      <section className="contact-main" data-nav-theme="light">
        <div className="contact-left">
          <h2>
            Get in Touch
          </h2>
          <p className="body-lg">
            Have questions or ready to begin? Get in touch and let&apos;s discuss the
            right program for you.
          </p>
          <div className="contact-info">
            <div className="contact-info-block">
              <p className="eyebrow">Contact Information</p>
              <a href="mailto:m.usidamen@gmail.com" className="contact-email">
                <ArrowIcon className="contact-arrow" />
                m.usidamen@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="contact-right">
          <form
            className="contact-form"
            action="https://formsubmit.co/m.usidamen@gmail.com"
            method="POST"
          >
            <input
              type="hidden"
              name="_subject"
              value="New contact form submission — Biomusclepilates"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_cc" value="cggguuup@gmail.com" />
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                className="form-input"
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your phone number"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                className="form-textarea"
                id="message"
                name="message"
                placeholder="Tell us what you'd like to improve..."
                rows={5}
                required
              />
            </div>
            <button type="submit" className="btn">
              <span className="btn-label">
                <span className="btn-text-top">Send Message</span>
                <span className="btn-text-bottom">Send Message</span>
              </span>
              <span className="btn-icon">
                <ArrowIcon />
              </span>
            </button>
          </form>
        </div>
      </section>

      <section className="consultation-section" data-nav-theme="light">
        <ScrollReveal>
          <p className="eyebrow">Consultation</p>
          <h2>
            Not sure where <span className="dim">to start?</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="body-lg">
            Tell us what you&apos;re looking to improve — whether it&apos;s strength, core
            development, pelvic stability, posture, or overall movement — and we&apos;ll
            help you determine the best place to begin.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button label="Get Started" href="/contact" />
            <button
              onClick={openBookSession}
              style={{
                padding: '0 24px',
                backgroundColor: 'var(--electric)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '2px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'uppercase',
              }}
            >
              Book a Session
            </button>
          </div>
        </ScrollReveal>
      </section>

      <CTASection
        headline={
          <>
            Your stronger body starts
            <br />
            with one step.
          </>
        }
        buttonLabel="Get Started"
        showBookSessionButton
      />
    </>
  )
}
