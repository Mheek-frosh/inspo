import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import StripeWrap from '../components/StripeWrap'
import CTASection from '../components/CTASection'
import { images } from '../assets/paths'
import { useHeroLoaded } from '../hooks/useSiteEffects'
import { useBookSession } from '../context/BookSessionContext'

const philosophyPoints = [
  'Targeted muscle strengthening',
  'Core development',
  'Pelvic stability',
  'Better posture',
  'Controlled movement',
  'Progressive improvement',
]

type AboutPageProps = {
  heroLoaded: boolean
  splashActive: boolean
}

export default function AboutPage({ heroLoaded, splashActive }: AboutPageProps) {
  const { openBookSession } = useBookSession()
  const pageHeroLoaded = useHeroLoaded(splashActive ? 1600 : 50)

  const heroClass = [
    'about-hero',
    heroLoaded || pageHeroLoaded ? 'hero-loaded' : '',
    splashActive ? 'splash-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      {/* Hero / introduction */}
      <section className={heroClass} data-nav-theme="dark">
        <div className="animated-stripe" />
        <div className="about-hero-photo">
          <img src={images.about} alt="Strength and movement training" />
          <div className="hero-bottom">
            <div className="hero-headline">
              <h1>
                A Stronger Body Starts With a{' '}
                <span className="dim">Stronger Foundation.</span>
              </h1>
            </div>
            <div className="hero-text">
              <Button label="Start Your Journey" href="/contact" white />
            </div>
          </div>
        </div>
        <button
          onClick={openBookSession}
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70px',
            padding: '0 40px',
            backgroundColor: 'var(--electric)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font)',
            zIndex: 10,
          }}
        >
          BOOK A SESSION
        </button>
      </section>

      <StripeWrap />

      {/* Philosophy and approach */}
      <section className="about-strategy" data-nav-theme="light">
        <ScrollReveal className="about-strategy-text">
          <p className="eyebrow">Our Approach</p>
          <h2>
            Strength. Alignment. <span className="demoted">Control.</span>
          </h2>
        </ScrollReveal>
        <div className="about-strategy-color">
          <div className="body-lg about-strategy-body">
            <p>
              We help people understand and strengthen their bodies through guided movement
              and targeted exercise — building a foundation that supports how you move every
              day.
            </p>
            <p>
              <span className="text-callout">
                This isn&apos;t simply about appearance.
              </span>{' '}
              Our programs focus on strengthening the muscles responsible for supporting
              your body and improving how your body moves.
            </p>
          </div>
        </div>
      </section>

      {/* Visual crop path for the portrait section */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="cara-clip" clipPathUnits="objectBoundingBox">
            <path d="M0 0.5C0 0.2239 0.1864 0 0.4164 0H1V1H0.4164C0.1864 1 0 0.7761 0 0.5Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Core values and methodology */}
      <section className="about-cara" data-nav-theme="light">
        <ScrollReveal className="about-cara-content">
          <div className="about-cara-header">
            <h3>Our Philosophy</h3>
            <h3>We believe movement should feel intentional.</h3>
          </div>
          <div className="body-lg about-cara-body">
            <p>The approach focuses on:</p>
            <ul className="who-list" style={{ marginTop: 16 }}>
              {philosophyPoints.map((point, index) => (
                <li key={point} className="who-list-item">
                  <div className="services-num">{index + 1}</div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        <div className="about-cara-visual">
          <div className="about-cara-group">
            <div className="about-cara-shape">
              <img src={images.caraPortrait} alt="Guided strength and movement session" />
            </div>
            <div className="about-cara-accent" />
          </div>
        </div>
      </section>

      {/* Audience / who this is for */}
      <section className="consultation-section" data-nav-theme="light">
        <ScrollReveal>
          <p className="eyebrow">Who We Help</p>
          <h2>Programs for every body.</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="body-lg">
            Our programs are designed for both women and men, with exercises adapted to
            individual needs and fitness levels. Whether you&apos;re rebuilding strength,
            improving alignment, or developing greater body control, we meet you where you
            are.
          </p>
        </ScrollReveal>
      </section>

      <CTASection
        headline={
          <>
            Your body deserves the
            <br />
            right foundation.
          </>
        }
        buttonLabel="Start Your Journey"
        showBookSessionButton
      />
    </>
  )
}
