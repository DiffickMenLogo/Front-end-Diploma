import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nowPlaying: false,
}

export const soundPlayerSlice = createSlice({
  name: 'soundPlayerSlice',
  initialState,
  reducers: {
    startPlay: (state) => {
      state.nowPlaying = true
    },
    stopPlayng: (state) => {
      state.nowPlaying = false
    },
  },
})

export default soundPlayerSlice.reducer
