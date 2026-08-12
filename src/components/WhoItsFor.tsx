import ScrollReveal from './ScrollReveal'

const defaultItems = [
  'Strengthen their body',
  'Improve posture and alignment',
  'Build core strength',
  'Improve pelvic stability',
  'Recover and rebuild physical strength after major body changes',
  'Move with greater confidence',
  'Develop better body control',
]

type WhoItsForProps = {
  eyebrow?: string
  intro?: string
  items?: string[]
}

export default function WhoItsFor({
  eyebrow = "Who It's For",
  intro = 'Suitable for people who want to:',
  items = defaultItems,
}: WhoItsForProps) {
  return (
    <section className="about-testimonial who-its-for" data-nav-theme="light">
      <ScrollReveal>
        <p className="eyebrow about-testimonial-eyebrow">{eyebrow}</p>
      </ScrollReveal>
      <ScrollReveal className="about-testimonial-content">
        <p className="body-lg" style={{ marginBottom: 24 }}>
          {intro}
        </p>
        <ul className="who-list">
          {items.map((item, index) => (
            <li key={item} className="who-list-item">
              <div className="services-num">{index + 1}</div>
              <span className="body">{item}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
      <div className="about-testimonial-attribution" aria-hidden="true" />
      <div className="about-testimonial-vline" />
      <div className="about-testimonial-decor">
        <div className="about-testimonial-hline" />
        <div className="about-testimonial-block" />
      </div>
    </section>
  )
}
