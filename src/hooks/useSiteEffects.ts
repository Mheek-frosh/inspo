import { useEffect, useState, type RefObject } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollEffects() {
  const [scrolled, setScrolled] = useState(false)
  const [frostHidden, setFrostHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      setFrostHidden(window.scrollY > 60)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, frostHidden }
}

export function useNavTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const location = useLocation()

  useEffect(() => {
    const navHeight = 60

    const resolveTheme = () => {
      const probeY = navHeight + 8
      const probeX = Math.round(window.innerWidth / 2)
      const hit = document.elementFromPoint(probeX, probeY)
      const section = hit?.closest<HTMLElement>('[data-nav-theme]')

      if (section) {
        const next = section.getAttribute('data-nav-theme')
        if (next === 'dark' || next === 'light') {
          setTheme(next)
          return
        }
      }

      const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]')
      let bestEl: HTMLElement | null = null
      let bestArea = 0

      for (const el of sections) {
        const rect = el.getBoundingClientRect()
        const top = Math.max(rect.top, navHeight)
        const bottom = Math.min(rect.bottom, window.innerHeight)
        const area = Math.max(0, bottom - top)

        if (area > bestArea) {
          bestArea = area
          bestEl = el
        }
      }

      const fallback = bestEl?.getAttribute('data-nav-theme')
      if (fallback === 'dark' || fallback === 'light') {
        setTheme(fallback)
      }
    }

    resolveTheme()
    window.addEventListener('scroll', resolveTheme, { passive: true })
    window.addEventListener('resize', resolveTheme)

    return () => {
      window.removeEventListener('scroll', resolveTheme)
      window.removeEventListener('resize', resolveTheme)
    }
  }, [location.pathname])

  return theme
}

export function useHeroLoaded(delay = 50) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), delay)
    return () => window.clearTimeout(timer)
  }, [delay])

  return loaded
}

export function useSplash() {
  const [splashActive, setSplashActive] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem('shapehaus-splash-seen')
    if (seen) {
      setSplashActive(false)
      return
    }

    sessionStorage.setItem('shapehaus-splash-seen', '1')
    const timer = window.setTimeout(() => setSplashActive(false), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  return splashActive
}

export function useParallax(ref: RefObject<HTMLElement | null>, speed = 0.15) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const offset = (window.innerHeight - rect.top) * speed
        el.style.transform = `translateY(${Math.min(Math.max(offset - 80, -40), 80)}px)`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref, speed])
}

export function usePatternParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const progress = 1 - rect.top / window.innerHeight
        el.style.transform = `translateY(${progress * 30}px)`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref])
}
