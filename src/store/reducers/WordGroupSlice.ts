import { setLevelAndPage } from './ActionCreaters'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWordGroupState } from '../../models/IWord'

const initialState: IWordGroupState = {
  words: [],
  isLoading: false,
  error: '',
  level: null,
  userData: {
    userName: '',
    userId: '',
    avatarURL: '',
    token: '',
  },
  settings: {
    musicVolume: 50,
    soundVolume: 50,
    wordVolume: 50,
    difficultWord: true,
    deleteWord: true,
    translateWord: true,
    translateSentences: true,
    theme: 'dark',
  },
  userWords: [],
  activeWords: [],
  statistics: {},
}

export const levelSlice = createSlice({
  name: 'levelWords',
  initialState,
  reducers: {
    setLevel(state, action: PayloadAction<number | null>) {
      state.level = action.payload
    },
    setActiveWords(state, action: PayloadAction<[]>) {
      state.activeWords = action.payload
    },
  },
  extraReducers: {
    [setLevelAndPage.fulfilled.type]: (state, action) => {
      state.words = action.payload
      state.isLoading = false
      state.error = ''
    },
    [setLevelAndPage.pending.type]: (state) => {
      state.isLoading = true
    },
    [setLevelAndPage.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // [postStats.fulfilled.type]: (state, action) => {
    //   state.statistics = action.payload
    //   state.userData = action.payload
    // },
  },
})

export default levelSlice.reducer
