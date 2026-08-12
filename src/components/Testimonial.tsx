import { icons } from '../assets/paths'

type TestimonialProps = {
  photo: string
  photoAlt: string
  quote: string
  name: string
  title: string
}

export default function Testimonial({
  photo,
  photoAlt,
  quote,
  name,
  title,
}: TestimonialProps) {
  return (
    <section className="about-testimonial" data-nav-theme="light">
      <p className="eyebrow about-testimonial-eyebrow">Testimonial</p>
      <div className="about-testimonial-content">
        <blockquote className="about-testimonial-quote">
          <div className="about-testimonial-photo">
            <img src={photo} alt={photoAlt} />
          </div>
          <img src={icons.quote} alt="" className="about-testimonial-dropcap" />
          {quote}
        </blockquote>
      </div>
      <div className="about-testimonial-attribution">
        <p className="about-testimonial-name">{name}</p>
        <p className="about-testimonial-title">{title}</p>
      </div>
      <div className="about-testimonial-vline" />
      <div className="about-testimonial-decor">
        <div className="about-testimonial-hline" />
        <div className="about-testimonial-block" />
      </div>
    </section>
  )
}
