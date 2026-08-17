import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { bookingUrl } from '../components/BookSessionModal'

type BookSessionContextValue = {
  openBookSession: () => void
}

const BookSessionContext = createContext<BookSessionContextValue | null>(null)

export function BookSessionProvider({ children }: { children: ReactNode }) {
  const openBookSession = useCallback(() => {
    if (typeof window === 'undefined') return
    window.location.assign(bookingUrl)
  }, [])

  const value = useMemo(
    () => ({ openBookSession }),
    [openBookSession],
  )

  return (
    <BookSessionContext.Provider value={value}>{children}</BookSessionContext.Provider>
  )
}

export function useBookSession() {
  const ctx = useContext(BookSessionContext)
  if (!ctx) {
    throw new Error('useBookSession must be used within BookSessionProvider')
  }
  return ctx
}
