import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      hello world this is mehdi
    </div>
    {/* <App />/ */}
  </StrictMode>,
)