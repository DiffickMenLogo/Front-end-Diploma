import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IUser } from '../../models/IUser'
import { registrationAPI } from '../../services/PostService'
import { userSlice } from '../../store/reducers/UserSlice'

export function SignUp() {
  const [registration] = registrationAPI.useRegisterMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  interface IResponse {
    data: {
      user: IUser
      message: string
    }
    message: string
    error: {
      message: string
    }
  }

  const handleSubmit = useCallback(async () => {
    const allowedDomains = ['@gmail.com', '@mail.ru', '@yandex.ru']
    if (!email || !password || !name) {
      alert('Пароль, почта или имя не могут быть пустыми')
      return
    }
    if (!allowedDomains.some((domain) => email.endsWith(domain))) {
      alert('Почта должна принадлежать одному из следующих доменов: @gmail.com | @mail.ru | @yandex.ru')
      return
    }
    const response = (await registration({ email, password, name })) as IResponse
    console.log(response)
    if (!response.error) {
      alert('Успешно. Авторизуйтесь чтобы продолжить')
    } else {
      alert('Этот пользователь уже существует')
    }
  }, [email, password, name])

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__logo'>
          <h1>
            <span>BSTU</span> Lang
          </h1>
        </div>
        <div className='login-form'>
          <div className='name'>
            <p>Name</p>
            <input type='text' onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='email'>
            <p>Email</p>
            <input type='text' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='password__form'>
            <p>Password</p>
            <input type='password' onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className='login__btn' onClick={() => handleSubmit()}>
          Register
        </div>
        <Link className='login__register' to='/signin'>
          Есть аккаунт? Жми на меня!
        </Link>
      </div>
    </div>
  )
}
