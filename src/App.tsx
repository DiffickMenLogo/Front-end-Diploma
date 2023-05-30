import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Games from './components/games/Games'
// import { postAPI } from './services/PostService'
import { Sprint } from './components/games/Sprint'
import { AudioChallenge } from './components/games/AudioChallenge'
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom'
import { registrationAPI } from './services/PostService'
// import { BookContainer } from './components/book/BookContainer'
import { SignIn } from './components/sign/SignIn'
import { SignUp } from './components/sign/SignUp'
import { Profile } from './components/profile/Profile'
// import { Difficult } from './components/book/Difficult'
import { Statistics } from './components/stats/Statistics'
import { About } from './components/about/About'
import { IAuthError, IAuthResponse, IAuthResponseOrError } from './models/IUser'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'
import { BookContainer } from './components/book/BookContainer'
import { Difficult } from './components/book/Difficult'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { userSlice } from './store/reducers/UserSlice'
import { userWordsSlice } from './store/reducers/UserWords'
import { settingsSlice } from './store/reducers/SettingsSlice'
import { authSlice } from './store/reducers/IsLoginSlice'
import { statisticsSlice } from './store/reducers/StatisticsSlice'

function App() {
  const [refresh, { isError }] = registrationAPI.useRefreshMutation()
  const navigate = useNavigate()

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const token = useAppSelector((state) => state.authSlice.accessToken)

  const dispatch = useAppDispatch()
  const deleteUser = userSlice.actions.deleteUser
  const deleteStats = statisticsSlice.actions.deleteStats
  const deleteUserWOrds = userWordsSlice.actions.deleteUserWords
  const deleteSettings = settingsSlice.actions.deleteSettings
  const deleteToken = authSlice.actions.clearToken
  const clearSkip = authSlice.actions.clearSkip
  const setToken = authSlice.actions.setToken

  async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken')
    const accessToken = localStorage.getItem('accessToken')

    const later = new Date(Date.now() + 30 * 60000)
    const now = Date.now()

    // Проверка, есть ли accessToken и refreshToken в localStorage
    if (accessToken && refreshToken) {
      const expiration = Date.parse(localStorage.getItem('exp') || '')
      // Проверка, не истек ли срок действия accessToken
      if (now < expiration) {
        console.log('accessToken is valid')
      } else {
        console.log('accessToken has expired')

        // Обновление токена с помощью refresh-токена
        if (refreshToken !== null) {
          console.log(now, 'now', expiration, 'exp')
          if (now >= expiration) {
            try {
              await refresh({ refreshToken })
                .unwrap()
                .then((res: any) => {
                  localStorage.setItem('accessToken', res.accessToken)
                  localStorage.setItem('refreshToken', res.refreshToken)
                  dispatch(setToken(res.accessToken))
                  localStorage.setItem('exp', later.toISOString())
                  console.log('tokenUpdate')
                })
                .catch((e) => {
                  localStorage.clear()
                  dispatch(deleteToken())
                  dispatch(deleteUser())
                  dispatch(deleteSettings())
                  dispatch(deleteStats())
                  dispatch(deleteUserWOrds())
                  dispatch(clearSkip())
                  console.log('exit')
                  navigate('/')
                })
            } catch (e) {
              console.log(e, 'App.tsx')
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (token) {
      intervalRef.current = setInterval(async function () {
        await refreshToken()
      }, 300000)

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [refresh])

  useEffect(() => {
    refreshToken().catch((e) => {
      console.log(e)
    })
  }, [])

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/games' element={<Games />} />
        <Route path='/games/sprint' element={<Sprint />} />
        <Route path='/games/audio_chalenge' element={<AudioChallenge />} />
        <Route path='/book' element={<BookContainer />} />
        <Route path='/book/difficult' element={<Difficult />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
