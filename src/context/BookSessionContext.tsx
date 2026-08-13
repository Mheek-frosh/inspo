import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'

type BookSessionContextValue = {
  openBookSession: () => void
}

const BookSessionContext = createContext<BookSessionContextValue | null>(null)

export function BookSessionProvider({ children }: { children: ReactNode }) {
  const openBookSession = useCallback(() => {
    document.querySelector<HTMLAnchorElement>('#breely-booking-trigger')?.click()
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
