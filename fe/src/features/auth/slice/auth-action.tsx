import { createAsyncThunk } from '@reduxjs/toolkit'
import { tryCatch } from '@/utils'
import { httpRequest } from '@/utils'

// create async thunk to handle when user log in
type DataLogInType = {
  email: string
  password: string
}

export const logIn = createAsyncThunk('user/logIn', async (value: DataLogInType, thunkAPI) => {
  try {
    const { data, error } = await tryCatch(
      httpRequest.post('/login', {
        email: value.email,
        password: value.password,
      })
    )

    if (error) {
      return {
        success: false,
        data: error,
      }
    }

    return {
      success: true,
      data: data.data.data,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
