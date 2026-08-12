import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type BookSessionContextValue = {
  isOpen: boolean
  openBookSession: () => void
  closeBookSession: () => void
}

const BookSessionContext = createContext<BookSessionContextValue | null>(null)

export function BookSessionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openBookSession = useCallback(() => setIsOpen(true), [])
  const closeBookSession = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, openBookSession, closeBookSession }),
    [isOpen, openBookSession, closeBookSession],
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
