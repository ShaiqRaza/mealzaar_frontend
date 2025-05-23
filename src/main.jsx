import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserAuthProvider } from './context/UserAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </StrictMode>,
)
