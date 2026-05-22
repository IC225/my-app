import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TmdbProvider } from './contexts/TmdbContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TmdbProvider>
      <App />
    </TmdbProvider>
  </StrictMode>,
)
