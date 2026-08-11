import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initStorage } from './lib/storage.js'
import { posts, categories } from './data/posts.js'

// Seed localStorage with static data on first load
initStorage(posts, categories)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
