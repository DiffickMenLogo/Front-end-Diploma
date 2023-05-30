import { fetchWords } from './ActionCreaters'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserWordsInitial, IWord, IWordState } from '../../models/IWord'

const initialState: IUserWordsInitial = {
  words: [],
  page: 0,
  group: 0,
  perPage: 29,
}

export const userWordsSlice = createSlice({
  name: 'allWordsUser',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<IWord>) => {
      state.words.push(action.payload)
    },
    addWords: (state, action: PayloadAction<IWord[]>) => {
      state.words.push(...action.payload)
    },
    setWords: (state, action: PayloadAction<IWord[]>) => {
      state.words = action.payload
    },
    deleteUserWords: (state) => {
      state.words = []
      state.page = initialState.page
      state.group = initialState.group
      state.perPage = initialState.perPage
    },
  },
})

export default userWordsSlice.reducer
