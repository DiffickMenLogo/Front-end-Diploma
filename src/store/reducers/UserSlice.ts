import { IFullUser, ISettings, IStatistics, IUser } from './../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserWord } from '../../models/IWord';

const initialState = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') || '{}')?.data
  : {
      token: '',
      userId: '',
      userName: '',
      userEmail: '',
      avatarURL: '',
      settings: {
        soundVolume: 0,
        musicVolume: 0,
        wordVolume: 0.5,
        difficultWord: true,
        deleteWord: true,
        translateWord: true,
        translateSentences: true,
        theme: 'dark',
      },
      userWords: [],
      statistics: {
        todayDate: '',
        learnedWordsTotal: 0,
        learnedWordsToday: 0,
        learnedWordsPerDate: [],
        percentToday: '0%',
        games: [
          {
            name: 'Саванна',
            longestSeries: 0,
            correctPercent: 0,
            wordsCount: 0,
          },
          {
            name: 'Составление',
            longestSeries: 0,
            correctPercent: 0,
            wordsCount: 0,
          },
          {
            name: 'Спринт',
            longestSeries: 0,
            correctPercent: 0,
            wordsCount: 0,
          },
          {
            name: 'Аудиовызов',
            longestSeries: 0,
            correctPercent: 0,
            wordsCount: 0,
          },
        ],
      },
      message: '',
    }

// interface ISettings {
//     soundVolume: number
//     musicVolume: number
//     wordVolume: number
//     difficultWord: boolean
//     deleteWord: boolean
//     translateWord: boolean
//     translateSentences: boolean
//     theme: string
// }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IFullUser>) => {
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.userName = action.payload.userName
      state.userEmail = action.payload.userEmail
      state.avatarURL = action.payload.avatarURL
      state.settings = action.payload.settings
      state.userWords = action.payload.userWords
      state.statistics = action.payload.statistics
      state.message = action.payload.message
    },
    setSettings: (state, action: PayloadAction<ISettings>) => {
      state.settings = action.payload.settings
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatarURL = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    setStatistics: (state, action: PayloadAction<IStatistics>) => {
      state.statistics = action.payload.statistics
      state.message = action.payload.message
      state.userWords = action.payload.userWords
      localStorage.setItem('user', JSON.stringify({ data: state }))
    },
    addUserWords: (state, action: PayloadAction<IUserWord>) => {
      state.userWords = action.payload
      localStorage.setItem('user', JSON.stringify({data: state}));
  }
  },
})

export default userSlice.reducer
