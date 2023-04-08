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

export const wordSliceUser = createSlice({
  name: 'allWordsUser',
  initialState,
  reducers: {
    getUserWords: (state: IWordState, action: PayloadAction<IWordState>) => {
      state.isLoading = false;
    },
  },
})

export default wordSliceUser.reducer
