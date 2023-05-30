import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISettings } from './../../models/IUser'

const initialState: ISettings = localStorage.getItem('settings')
  ? JSON.parse(localStorage.getItem('settings') || '')
  : {
      userId: localStorage.getItem('uid') ? String(localStorage.getItem('uid')) : 'null',
      soundVolume: 0,
      musicVolume: 0,
      wordVolume: 50,
      difficultWord: true,
      deleteWord: true,
      translateWord: true,
      translateSentences: true,
      theme: 'dark',
    }

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<ISettings>) => {
      state.deleteWord = action.payload.deleteWord
      state.difficultWord = action.payload.difficultWord
      state.musicVolume = action.payload.musicVolume
      state.soundVolume = action.payload.soundVolume
      state.theme = action.payload.theme
      state.translateSentences = action.payload.translateSentences
      state.translateWord = action.payload.translateWord
      state.userId = action.payload.userId
      state.wordVolume = action.payload.wordVolume
    },
    deleteSettings: (state: ISettings) => {
      state.userId = ''
      state.soundVolume = 0
      state.musicVolume = 0
      state.wordVolume = 50
      state.difficultWord = true
      state.deleteWord = true
      state.translateWord = true
      state.translateSentences = true
      state.theme = 'dark'
    },
  },
})

export default settingsSlice.reducer
