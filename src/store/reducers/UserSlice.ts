import { ISettings, IStatistics, IUser, IUserSet } from './../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserWord } from '../../models/IWord'

const initialState = localStorage.getItem('user')
  ? (JSON.parse(localStorage.getItem('user') || '') as IUser)
  : {
      id: '',
      name: '',
      email: '',
      avatarURL: '',
    }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSet>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.avatarURL = action.payload.avatarURL
      state.id = action.payload.id
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatarURL = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    deleteUser: (state) => {
      state.id = ''
      state.name = ''
      state.email = ''
      state.avatarURL = ''
    },
  },
})

export default userSlice.reducer
