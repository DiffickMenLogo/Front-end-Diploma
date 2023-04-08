import { fetchWords } from './ActionCreaters'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWordState } from '../../models/IWord'

const initialState: IWordState = {
  words: [],
  isLoading: false,
  error: '',
  page: 0,
  group: 0,
  perPage: 29,
  totalCount: 20
}

export const wordSlice = createSlice({
  name: 'allWords',
  initialState,
  reducers: {
    setPage: (state: IWordState, action: PayloadAction<number>) => {
      state.page = action.payload;
      localStorage.setItem('page', JSON.stringify(state.page))
    },
    setGroup: (state: IWordState, action: PayloadAction<number>) => {
      state.group = action.payload;
      localStorage.setItem('group', JSON.stringify(state.group))
    },
  },
  extraReducers: {
    [fetchWords.fulfilled.type]: (state, action) => {
      state.words = action.payload
      state.isLoading = false
      state.error = ''
      state.totalCount = 10;
    },
    [fetchWords.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchWords.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default wordSlice.reducer
