import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App/App'
import { BrowserRouter } from 'react-router-dom'
const rootNode = document.getElementById('app')

if (rootNode) {
  createRoot(rootNode).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}
