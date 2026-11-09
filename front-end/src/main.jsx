import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RestaurantProvider } from './context/RestaurantContext'
import './index.css'
import './App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <RestaurantProvider>
        <App />
      </RestaurantProvider>
    </BrowserRouter>
  </StrictMode>,
)
