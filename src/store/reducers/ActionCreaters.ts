import { useAppDispatch } from './../../hooks/redux'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IWord } from '../../models/IWord'
import { useAppSelector } from '../../hooks/redux'
import { IFullUser } from '../../models/IUser'
import { userSlice } from '../../store/reducers/UserSlice'
import { useDispatch } from 'react-redux'

export const fetchWords = createAsyncThunk('allWords/fetchWords', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IWord[]>('https://rs-lang-back-diffickmenlogo.herokuapp.com/')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('Error')
  }
})

export const setLevelAndPage = createAsyncThunk(
  'levelWords/setLevelAndPage',
  async (query: { group: number | null; page: number }, { rejectWithValue }) => {
    try {
      const { page = 0, group = 0 } = query
      const response = await axios.get<IWord[]>(`https://rs-lang-back-diffickmenlogo.herokuapp.com/allWords?group=${group}&page=${page}`)
      console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue('Error')
    }
  },
)

// export const postStats = createAsyncThunk('levelWords/postStats', async (settings: ISettings, { rejectWithValue }) => {
//   // const dispatch = useDispatch()
//   // const setStatistics = userSlice.actions.setStatistics
//   try {
//     const config = {
//       method: 'POST',
//       withCredentials: true,
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${settings.user.token}`,
//       },
//       body: JSON.stringify({
//         userName: settings.user.userName,
//         gameName: settings.gameName,
//         correctArr: settings.correctAnswers,
//         failArr: settings.failAnswers,
//         seriesArr: settings.allSeries,
//       }),
//     }
//     const response = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/statistics', config)
//     const data = await response.json()
//     // dispatch(setStatistics(data))
//     localStorage.setItem('user', JSON.stringify({ data }))
//     console.log(data)

//     return console.log(response.body)
//   } catch (error) {
//     console.log(error)
//     return rejectWithValue('Error')
//   }
// })
