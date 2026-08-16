import ArrowIcon from '../components/ArrowIcon'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import StripeWrap from '../components/StripeWrap'
import CTASection from '../components/CTASection'
import { images } from '../assets/paths'
import { useHeroLoaded } from '../hooks/useSiteEffects'
import { useBookSession } from '../context/BookSessionContext'

const serviceCards = [
  {
    title: 'Muscle Strengthening',
    subtitle: 'Build strength where your body needs it most.',
    body: 'Target key muscle groups through controlled exercises designed to improve strength, stability, and physical control.',
  },
  {
    title: 'Pelvic Alignment & Stability',
    subtitle: 'Create a stronger, more stable foundation.',
    body: 'Work on the muscles around the pelvis and lower body to support better alignment, stability, posture, and movement.',
  },
  {
    title: 'Core & Ab Strengthening',
    subtitle: 'Build a stronger center.',
    body: 'Focused exercises for the abdominal and core muscles to improve stability, balance, posture, and overall body control.',
  },
  {
    title: 'Muscle Balance',
    subtitle: 'Strengthen the body as a whole.',
    body: 'Identify areas that may need additional attention and develop a balanced approach to strengthening different muscle groups.',
  },
  {
    title: 'Mobility & Movement',
    subtitle: 'Move with greater freedom and control.',
    body: 'Combine strengthening with controlled movement to help improve mobility and body awareness.',
  },
  {
    title: 'Personalized Programs',
    subtitle: 'Your body is unique. Your program should be too.',
    body: 'Create a program based on individual goals, current ability, and areas that need the most attention.',
  },
]

function SectionArrow() {
  return <ArrowIcon className="svc-approach-arrow" />
}

type ServicesPageProps = {
  heroLoaded: boolean
  splashActive: boolean
}

export default function ServicesPage({
  heroLoaded,
  splashActive,
}: ServicesPageProps) {
  const { openBookSession } = useBookSession()
  const pageHeroLoaded = useHeroLoaded(splashActive ? 1600 : 50)

  const heroClass = [
    'svc-hero',
    heroLoaded || pageHeroLoaded ? 'hero-loaded' : '',
    splashActive ? 'splash-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <section className={heroClass} data-nav-theme="dark">
        <div className="animated-stripe" />
        <div className="svc-hero-photo">
          <img src={images.services} alt="Strength and movement programs" />
          <div className="hero-bottom">
            <div className="hero-headline">
              <h1>
                Build Strength. Restore Balance.{' '}
                <span className="dim">Move Better.</span>
              </h1>
            </div>
            <div className="hero-text">
              <Button label="Get Started" href="/contact" white />
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
            padding: '16px 32px',
            backgroundColor: 'var(--electric)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            letterSpacing: '1px',
            zIndex: 10,
            minWidth: '180px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Book a Session
        </button>
      </section>

      <StripeWrap />

      <section className="svc-approach" data-nav-theme="light">
        <ScrollReveal className="svc-approach-header">
          <h2>
            Our Programs <SectionArrow />{' '}
            <span className="demoted">
              Focus on the muscles and movement patterns that help create a stronger, more
              stable body.
            </span>
          </h2>
        </ScrollReveal>
      </section>

      <section className="svc-offerings" data-nav-theme="light">
        <ScrollReveal className="svc-offerings-header">
          <h2>
            Services <SectionArrow />{' '}
            <span className="demoted">What we offer.</span>
          </h2>
        </ScrollReveal>
        <div className="svc-offerings-grid">
          {serviceCards.map((card, index) => (
            <ScrollReveal key={card.title} className="svc-card">
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                Service {String(index + 1).padStart(2, '0')}
              </p>
              <h4>{card.title}</h4>
              <p className="body" style={{ marginTop: 16, color: 'var(--navy)' }}>
                {card.subtitle}
              </p>
              <p className="body">{card.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

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
        showBookSessionButton
      />
    </>
  )
}
