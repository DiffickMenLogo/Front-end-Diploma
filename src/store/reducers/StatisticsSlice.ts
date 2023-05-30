import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { IStatistics, IUserStatistics } from '../../models/IUser'

const initialState: IUserStatistics = {
  userId: localStorage.getItem('user') ? JSON.parse(String(localStorage.getItem('user'))).id : '',
  todayDate: new Date().toISOString().substring(0, 10),
  learnedWordsToday: 0,
  learnedWordsTotal: 0,
  learnedWordsPerDate: [],
  percentToday: '',
  games: [],
}

export const statisticsSlice = createSlice({
  name: 'statisticsSlice',
  initialState,
  reducers: {
    addStat: (state, action: PayloadAction<IStatistics>) => {
      state.games.push(action.payload)
      statisticsSlice.caseReducers.updateStats(state)
    },
    setGames: (state, action: PayloadAction<IStatistics[]>) => {
      state.games = action.payload
      statisticsSlice.caseReducers.updateStats(state)
    },
    updateStats: (state: IUserStatistics) => {
      const totalWordsLearned = state.games.reduce((acc, game) => {
        const learnedWordsInGame = (game.totalWords * game.correctPercent) / 100
        return acc + learnedWordsInGame
      }, 0)

      state.games.map((game) => {
        const currentDate = new Date(game.date)
        const dateString = currentDate.toISOString().substring(0, 10) // convert date to string in format YYYY-MM-DD

        const dateObject = state.learnedWordsPerDate.find((date) => date.date === dateString)
        if (dateObject) {
          dateObject.words += (game.totalWords * game.correctPercent) / 100 // or whatever value you want to increment by
        } else {
          state.learnedWordsPerDate.push({ date: dateString, words: (game.totalWords * game.correctPercent) / 100 }) // create new object with initial value 1
        }
      })

      const learnedWordsToday = state.games
        .filter((game) => {
          const currentDate = new Date(game.date).toISOString().substring(0, 10)
          return state.todayDate === currentDate
        })
        .reduce((acc, game) => {
          const learnedWordsInGame = (game.totalWords * game.correctPercent) / 100
          return acc + learnedWordsInGame
        }, 0)

      state.learnedWordsToday = learnedWordsToday
      state.learnedWordsTotal = totalWordsLearned

      state.percentToday = `${((learnedWordsToday / totalWordsLearned) * 100).toFixed(2)}%`
    },
    deleteStats: (state: IUserStatistics) => {
      state.userId = ''
      state.todayDate = String(Date.now())
      state.learnedWordsToday = 0
      state.learnedWordsTotal = 0
      state.learnedWordsPerDate = []
      state.percentToday = ''
      state.games = []
    },
  },
})

export default statisticsSlice.reducer
