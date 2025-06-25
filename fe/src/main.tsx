import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/router'
import { Toaster } from './components'
import { store } from '@/redux-store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = savedTheme || (prefersDark ? 'dark' : 'light')

  document.documentElement.classList.toggle('dark', theme === 'dark')
}

initializeTheme()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
)
