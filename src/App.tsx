import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Splash from './components/Splash'
import BookSessionModal, { FloatingBookButton } from './components/BookSessionModal'
import { BookSessionProvider } from './context/BookSessionContext'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import {
  useHeroLoaded,
  useNavTheme,
  useScrollEffects,
  useSplash,
} from './hooks/useSiteEffects'

function AppContent() {
  const location = useLocation()
  const theme = useNavTheme()
  const { scrolled, frostHidden } = useScrollEffects()
  const splashActive = useSplash()
  const heroLoaded = useHeroLoaded(splashActive ? 1600 : 50)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [menuOpen])

  const pageProps = { heroLoaded, splashActive }

  return (
    <>
      <Splash active={splashActive} />
      <Navigation
        theme={theme}
        activePath={location.pathname}
        menuOpen={menuOpen}
        scrolled={scrolled}
        frostHidden={frostHidden}
        homeHero={location.pathname === '/' && !scrolled}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />
      <Routes>
        <Route path="/" element={<HomePage {...pageProps} />} />
        <Route path="/about" element={<AboutPage {...pageProps} />} />
        <Route path="/services" element={<ServicesPage {...pageProps} />} />
        <Route path="/contact" element={<ContactPage {...pageProps} />} />
      </Routes>
      <BookSessionModal />
      <FloatingBookButton />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BookSessionProvider>
        <AppContent />
      </BookSessionProvider>
    </BrowserRouter>
  )
}
