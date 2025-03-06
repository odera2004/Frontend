import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="966596015701-uboj1sj74vk6p35nv4g02r25jgiphmoj.apps.googleusercontent.com">
    <App />

    </GoogleOAuthProvider>
    

    
  </StrictMode>,
)