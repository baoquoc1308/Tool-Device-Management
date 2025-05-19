import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/features/auth'
export const store = configureStore({
  reducer: { auth: authReducer },
})
// Get the type of store variable
export type AppStore = typeof store
// Get type of all the state in store -> new type RootState
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
