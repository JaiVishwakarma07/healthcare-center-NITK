import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/authContext.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LocalizationProvider>
  </AuthContextProvider>
)
