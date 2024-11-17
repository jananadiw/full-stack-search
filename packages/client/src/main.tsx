import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HotelDetail from './components/HotelDetail.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
