import authSlice from './reducers/IsLoginSlice'
import userSlice from './reducers/UserSlice'
import { postAPI, registrationAPI, settingsAPI, statsAPI, userAPI, userWordsAPI } from './../services/PostService'
import wordSlice from './reducers/WordSlice'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import levelSlice from './reducers/WordGroupSlice'
import settingsSlice from './reducers/SettingsSlice'
import statisticsSlice from './reducers/StatisticsSlice'
import userWordsSlice from './reducers/UserWords'
import soundPlayerSlice from './reducers/SoundPlayerSlice'

const rootReducer = combineReducers({
  wordSlice,
  userSlice,
  userWordsSlice,
  levelSlice,
  authSlice,
  settingsSlice,
  statisticsSlice,
  soundPlayerSlice,
  [postAPI.reducerPath]: postAPI.reducer,
  [registrationAPI.reducerPath]: registrationAPI.reducer,
  [userWordsAPI.reducerPath]: userWordsAPI.reducer,
  [statsAPI.reducerPath]: statsAPI.reducer,
  [settingsAPI.reducerPath]: settingsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(postAPI.middleware)
        .concat(registrationAPI.middleware)
        .concat(settingsAPI.middleware)
        .concat(userWordsAPI.middleware)
        .concat(statsAPI.middleware)
        .concat(userAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
