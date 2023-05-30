import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IAuthResponse, IAuthResponseOrError, IUserIdResponse } from '../../models/IUser'
import { postAPI, registrationAPI, settingsAPI } from '../../services/PostService'
import { userSlice } from '../../store/reducers/UserSlice'
import '../../style/sign/SignIn.scss'
import IsLoginSlice, { authSlice } from '../../store/reducers/IsLoginSlice'
import { settingsSlice } from '../../store/reducers/SettingsSlice'

const MailEndsWith = ['@gmail.com', '@mail.ru', '@yandex.ru']

export function SignIn() {
  const navigate = useNavigate()
  const later = new Date(Date.now() + 30 * 60000)

  const [authorization] = registrationAPI.useLoginMutation()

  const user = useAppSelector((state) => state.userSlice)
  const settings = useAppSelector((state) => state.settingsSlice)
  const skip = useAppSelector((state) => state.authSlice.skip)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setToken = authSlice.actions.setToken
  const setUser = userSlice.actions.setUser
  const setSkip = authSlice.actions.setSkip
  const setSettings = settingsSlice.actions.setSettings
  const dispatch = useAppDispatch()

  const { data, isSuccess } = settingsAPI.useGetSettingsQuery(user.id, {
    skip,
  })

  useEffect(() => {
    if (data) {
      dispatch(setSettings(data))
      localStorage.setItem('settings', JSON.stringify(data))
      console.log(data, 'data')
      console.log(settings, 'settings')
    }
    if (isSuccess) {
      navigate('/profile')
    }
  }, [data])

  const handleSubmit = useCallback(async () => {
    try {
      if (!email || !password) {
        console.log('Пароль или почта не могут быть пустыми')
        return
      }

      const { data, error } = (await authorization({ email, password })) as IAuthResponseOrError

      if (data) {
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('exp', later.toISOString())
        dispatch(setToken(data.accessToken))
        dispatch(setSkip(false))

        const { avatarURL, name, id } = data
        const newUser = {
          email,
          avatarURL,
          name,
          id,
        }
        dispatch(setUser(newUser))
        localStorage.setItem('user', JSON.stringify(newUser))
        localStorage.setItem('settings', JSON.stringify(settings))
      }
      if (error) {
        alert(error.data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }, [email, password, dispatch])

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__logo'>
          <h1>
            <span>BSTU</span> Lang
          </h1>
        </div>
        <div className='login-form'>
          <div className='email'>
            <p>Email</p>
            <input
              type='text'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className='password__form'>
            <p>Password</p>
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
        </div>
        <div onClick={() => handleSubmit()} className='login__btn'>
          Login
        </div>
        <Link className='login__register' to='/signup'>
          Нет аккаунта? Просто нажми на меня
        </Link>
      </div>
    </div>
  )
}
