import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// 🌐 Smart API Routing: Automatically switches between Local Nginx (Dev) and Render (Prod)
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE_URL = isLocal 
    ? 'http://localhost:8080' 
    : 'https://aasa-backend.onrender.com'; 
import { BrowserRouter } from 'react-router-dom';
import './global.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>,
)
