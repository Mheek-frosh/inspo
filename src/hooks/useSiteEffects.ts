import { useEffect, useState, type RefObject } from 'react'

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

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          const nextTheme = visible[0].target.getAttribute('data-nav-theme')
          if (nextTheme === 'dark' || nextTheme === 'light') {
            setTheme(nextTheme)
          }
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5],
        rootMargin: '-60px 0px -50% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

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
