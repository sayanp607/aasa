import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
export const API_BASE_URL = 'http://localhost:8080'; 
import { BrowserRouter } from 'react-router-dom';
import './global.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>,
)
