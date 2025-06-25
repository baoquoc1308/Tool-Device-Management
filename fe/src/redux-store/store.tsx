import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/slice/reducer'
import themeReducer from '@/features/theme/slice/theme-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
