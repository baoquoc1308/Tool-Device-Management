import { createSlice } from '@reduxjs/toolkit'
import { logIn, getSession } from './auth-action'
import Cookies from 'js-cookie'

const initialState = {
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
  },
  accessToken: '',
  refreshToken: '',
  loading: false,
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
        if (action.payload.success) {
          state.accessToken = action.payload.data.access_token
          state.refreshToken = action.payload.data.refresh_token
          state.loading = false
        } else {
          state.loading = false
        }
      })
      .addCase(logIn.rejected, (state, _) => {
        state.loading = false
      })
      .addCase(getSession.pending, (state) => {
        state.loading = true
      })
      .addCase(getSession.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user.email = action.payload.data.email
          state.user.firstName = action.payload.data.first_name
          state.user.lastName = action.payload.data.last_name
          state.user.id = action.payload.data.id
          Cookies.set('email', action.payload.data.email)
          Cookies.set('firstName', action.payload.data.first_name)
          Cookies.set('lastName', action.payload.data.last_name)
          Cookies.set('id', action.payload.data.id)
          state.loading = false
        } else {
          state.loading = false
        }
      })
      .addCase(getSession.rejected, (state, _) => {
        state.loading = false
      })
  },
})

export default userSlice.reducer
