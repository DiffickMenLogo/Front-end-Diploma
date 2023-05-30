import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string
  skip: boolean
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') || '',
  skip: localStorage.getItem('accessToken') ? false : true,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setSkip: (state, action: PayloadAction<boolean>) => {
      state.skip = action.payload
    },
    clearSkip: (state) => {
      state.skip = true
    },
    clearToken: (state) => {
      state.accessToken = ''
    },
  },
})

export default authSlice.reducer
