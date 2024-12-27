import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
import SnakeGame from './game/Logic'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnakeGame />
    {/* <App /> */}
  </StrictMode>,
)
