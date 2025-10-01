import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SnakeGame from './game/Logic'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnakeGame />
  </StrictMode>,
)
