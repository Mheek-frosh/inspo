import { useEffect, useRef, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  pop?: boolean
}

export default function ScrollReveal({
  children,
  className = '',
  pop = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const baseClass = pop ? 'scroll-reveal-pop' : 'scroll-reveal'

  return (
    <div ref={ref} className={`${baseClass} ${className}`.trim()}>
      {children}
    </div>
  )
}
