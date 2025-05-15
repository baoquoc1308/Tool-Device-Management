import { createSlice } from '@reduxjs/toolkit'
import { logIn } from './auth-action'

const initialState = {
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
  },
  loading: false,
  error: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user.email = action.payload.data.email
        state.user.firstName = action.payload.data.first_name
        state.user.lastName = action.payload.data.last_name
        state.user.id = action.payload.data.id
        localStorage.setItem('userId', JSON.stringify(action.payload.data.id))
        state.loading = false
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload!
        state.loading = false
      })
  },
})

export default userSlice.reducer
