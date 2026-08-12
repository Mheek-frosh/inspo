import { Link } from 'react-router-dom'
import ArrowIcon from './ArrowIcon'
import { logos } from '../assets/paths'

const navItems: Array<{
  num: string
  label: string
  path: string
  contact?: boolean
}> = [
  { num: '01', label: 'Home', path: '/' },
  { num: '02', label: 'About', path: '/about' },
  { num: '03', label: 'Services', path: '/services' },
  { num: '04', label: 'Contact', path: '/contact', contact: true },
]

type NavigationProps = {
  theme: 'dark' | 'light'
  activePath: string
  menuOpen: boolean
  scrolled: boolean
  frostHidden: boolean
  homeHero?: boolean
  onToggleMenu: () => void
}

export default function Navigation({
  theme,
  activePath,
  menuOpen,
  scrolled,
  frostHidden,
  homeHero = false,
  onToggleMenu,
}: NavigationProps) {
  const markSrc = theme === 'light' && !menuOpen ? logos.markBlue : logos.markWhite

  const navClass = [
    'nav',
    scrolled ? 'nav-scrolled' : '',
    menuOpen ? 'nav-menu-open' : '',
    homeHero && !menuOpen ? 'nav--home-hero' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const frostClass = frostHidden ? 'nav-frost nav-frost-hidden' : 'nav-frost'

  return (
    <>
      <div className={frostClass} />
      <nav className={navClass} data-theme={theme}>
        <Link className="nav-logo" to="/">
          <img
            src={markSrc}
            alt=""
            className="logo-mark"
            aria-hidden="true"
          />
          <span className="logo-text">ShapeHaus</span>
        </Link>
        <button
          type="button"
          className={menuOpen ? 'nav-hamburger nav-hamburger-open' : 'nav-hamburger'}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'}>
          {navItems.map((item) => (
            <li
              key={item.path}
              className={activePath === item.path ? 'nav-active' : undefined}
            >
              <span className="nav-num">{item.num}</span>
              <Link
                className={item.contact ? 'nav-contact' : undefined}
                to={item.path}
                onClick={menuOpen ? onToggleMenu : undefined}
              >
                {item.label}
              </Link>
              <ArrowIcon
                stroke={menuOpen || theme === 'dark' ? 'white' : 'var(--navy)'}
                className="nav-arrow"
              />
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
