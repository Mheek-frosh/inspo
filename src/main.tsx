import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/mp2.css'
import './styles/shapehaus-overrides.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
