import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
export const API_BASE_URL = 'https://aasa-backend.onrender.com'; 
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>,
)
