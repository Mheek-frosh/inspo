import { useRef, useState } from 'react'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import StripeWrap from '../components/StripeWrap'
import WhoItsFor from '../components/WhoItsFor'
import CTASection from '../components/CTASection'
import JobApplicationModal from '../components/JobApplicationModal'
import { images } from '../assets/paths'
import { useHeroLoaded, useParallax, usePatternParallax } from '../hooks/useSiteEffects'
import { useBookSession } from '../context/BookSessionContext'

const focusAreas = [
  {
    num: 1,
    title: 'Muscle Strengthening',
    description:
      'Build strength in the muscles that support your everyday movement, posture, stability, and overall physical performance.',
  },
  {
    num: 2,
    title: 'Pelvic Alignment',
    description:
      'Target the muscles surrounding the pelvis to help improve stability, balance, posture, and movement.',
  },
  {
    num: 3,
    title: 'Core & Abs',
    description:
      'Strengthen your abdominal and core muscles to improve stability, control, and functional strength.',
  },
]

type HomePageProps = {
  heroLoaded: boolean
  splashActive: boolean
}

export default function HomePage({ heroLoaded, splashActive }: HomePageProps) {
  const [applicationOpen, setApplicationOpen] = useState(false)
  const { openBookSession } = useBookSession()
  const parallaxRef = useRef<HTMLDivElement>(null)
  const patternRef = useRef<HTMLDivElement>(null)
  const pageHeroLoaded = useHeroLoaded(splashActive ? 1600 : 50)

  useParallax(parallaxRef)
  usePatternParallax(patternRef)

  const heroClass = [
    'hero',
    'hero--wide',
    heroLoaded || pageHeroLoaded ? 'hero-loaded' : '',
    splashActive ? 'splash-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <section className={heroClass} id="hero" data-nav-theme="dark">
        <div className="animated-stripe" />
        <div className="hero-photo hero-photo--reformer">
          <img src={images.homeHero} alt="Pilates reformer strength training session" />
          <div className="hero-bottom">
            <div className="hero-headline">
              <h1>
                Stronger Body. Better Alignment. <span className="dim">Better You.</span>
              </h1>
            </div>
            <div className="hero-text">
              <p className="body-lg">
                Helping you strengthen your muscles, improve pelvic alignment, and build a
                stronger core through guided movement and targeted exercises.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button label="Get Started" href="/contact" white />
                <button
                  onClick={openBookSession}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'var(--electric)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                  }}
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StripeWrap />

      <section className="hiring-banner" data-nav-theme="dark" aria-labelledby="hiring-title">
        <div className="hiring-banner-orbit" aria-hidden="true" />
        <ScrollReveal className="hiring-banner-inner">
          <div className="hiring-banner-label">
            <span className="hiring-banner-pulse" aria-hidden="true" />
            We&apos;re Hiring
          </div>
          <div className="hiring-banner-copy">
            <p className="eyebrow">Position available</p>
            <h2 id="hiring-title">Admin Assistant</h2>
            <p className="body-lg">
              Join Biomusclepilates and help create a welcoming, organized experience for
              every client.
            </p>
          </div>
          <Button
            label="Apply Now"
            onClick={() => setApplicationOpen(true)}
            white
          />
        </ScrollReveal>
      </section>

      <JobApplicationModal
        isOpen={applicationOpen}
        onClose={() => setApplicationOpen(false)}
      />

      <section className="s2" id="what-we-do" data-nav-theme="light">
        <div className="s2-left">
          <ScrollReveal className="s2-content">
            <p className="eyebrow">What We Do</p>
            <h2>
              Move Better. <span className="dim">Feel Stronger.</span>
            </h2>
            <p className="body">
              Our programs focus on improving the way your body moves by strengthening key
              muscles, supporting better pelvic alignment, and developing a stronger core.
            </p>
            <Button label="Get Started" href="/contact" />
          </ScrollReveal>
        </div>
        <div className="s2-right">
          <div className="s2-right-cloud">
            <div className="s2-right-pattern" ref={patternRef}>
              <img src={images.pattern} alt="" aria-hidden="true" />
            </div>
            <ScrollReveal className="services-card" pop>
              <div className="services-card-header">Three main focus areas</div>
              <div className="services-card-body">
                {focusAreas.map((area, index) => (
                  <div key={area.title}>
                    <div className="services-item" style={{ alignItems: 'flex-start' }}>
                      <div className="services-num">{area.num}</div>
                      <div>
                        <span className="services-item-label">{area.title}</span>
                        <p className="body" style={{ marginTop: 8, whiteSpace: 'normal' }}>
                          {area.description}
                        </p>
                      </div>
                    </div>
                    {index < focusAreas.length - 1 && <div className="services-rule" />}
                  </div>
                ))}
                <div className="services-rule" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="about" id="why-it-matters" data-nav-theme="light">
        <div className="about-photo">
          <div className="about-photo-wrap">
            <div className="about-photo-parallax" ref={parallaxRef}>
              <img src={images.gym} alt="Person in guided movement session" />
            </div>
            <div className="about-badge-group">
              <div className="about-badge-accent" />
              <div className="about-badge">
                <span className="about-badge-number">3</span>
                <span className="about-badge-label">
                  Focus
                  <br />
                  Areas
                </span>
              </div>
            </div>
          </div>
        </div>
        <ScrollReveal className="about-content">
          <p className="eyebrow">Why It Matters</p>
          <h2>
            Your body works as <span className="dim">one system.</span>
          </h2>
          <p className="body">
            When your muscles are weak or imbalanced, it can affect your posture, movement,
            stability, and confidence. Our approach focuses on strengthening and conditioning
            the body as a whole.
          </p>
          <Button label="Learn More" href="/about" />
        </ScrollReveal>
      </section>

      <WhoItsFor />

      <CTASection
        headline={
          <>
            Ready to build a
            <br />
            stronger foundation?
          </>
        }
        subtext="Start your journey toward better strength, stability, and movement."
        buttonLabel="Get Started"
      />
    </>
  )
}
