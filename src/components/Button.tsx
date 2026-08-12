import { Link } from 'react-router-dom'
import ArrowIcon from './ArrowIcon'

type ButtonProps = {
  label: string
  href?: string
  onClick?: () => void
  white?: boolean
  external?: boolean
}

export default function Button({
  label,
  href,
  onClick,
  white,
  external,
}: ButtonProps) {
  const className = white ? 'btn btn-white' : 'btn'

  const content = (
    <>
      <span className="btn-label">
        <span className="btn-text-top">{label}</span>
        <span className="btn-text-bottom">{label}</span>
      </span>
      <span className="btn-icon">
        <ArrowIcon />
      </span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {content}
      </button>
    )
  }

  if (!href) return null

  if (external || href.startsWith('mailto:')) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    )
  }

  return (
    <Link className={className} to={href}>
      {content}
    </Link>
  )
}
