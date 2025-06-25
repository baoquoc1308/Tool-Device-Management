import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as ThemeMode
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

// Enhanced DOM manipulation để tránh flash hoàn toàn
const updateDOMTheme = (mode: ThemeMode) => {
  if (typeof window !== 'undefined') {
    const html = document.documentElement

    // Add class để disable all transitions
    html.classList.add('theme-switching')

    // Update theme immediately
    if (mode === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    // Remove class để re-enable transitions sau 150ms
    setTimeout(() => {
      html.classList.remove('theme-switching')
    }, 150)

    localStorage.setItem('theme', mode)
  }
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      updateDOMTheme(state.mode)
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      updateDOMTheme(state.mode)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
