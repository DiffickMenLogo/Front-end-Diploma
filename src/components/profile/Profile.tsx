import { Avatar, Box, Button, Container, Slider, Switch, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IFullUser, ISettings, ISettingsValue, IUser } from '../../models/IUser'
import { userSlice } from '../../store/reducers/UserSlice'
import '../../style/profile/Profile.scss'

export function Profile() {
  const user = useAppSelector((state) => state.userSlice) as IFullUser
  const setSettings = userSlice.actions.setSettings
  const setName = userSlice.actions.setName
  const setUser = userSlice.actions.setUser
  const setAvatar = userSlice.actions.setAvatar
  const dispatch = useAppDispatch()
  const [difficultWordChange, setDifficultWordChange] = useState<boolean>(user.userId !== '' ? user.settings.difficultWord : true)
  const [deletedWordChange, setDeletedWordChange] = useState<boolean>(user.userId !== '' ? user.settings.deleteWord : true)
  const [translateWordChange, setTranslateWordChange] = useState<boolean>(user.userId !== '' ? user.settings.translateWord : true)
  const [translateSentencesChange, setTranslateSentencesChange] = useState<boolean>(user.userId !== '' ? user.settings.translateSentences : true)
  const [musicVolumeChange, setMusicVolumeChange] = useState<number | number[]>(user.userId !== '' ? user.settings.musicVolume : 0)
  const [soundVolumeChange, setSoundVolumeChange] = useState<number | number[]>(user.userId !== '' ? user.settings.soundVolume : 0)
  const [wordVolumeChange, setWordVolumeChange] = useState<number | number[]>(user.userId !== '' ? user.settings.wordVolume : 50)
  const [nameChange, setNameChange] = useState<string>(user.userId !== '' ? user.userName : '')
  const [feedbackMessage, setFeedbackMessage] = useState<string>('')
  const [feedbackEmail, setFeedbackEmail] = useState<string>('')

  // const [themeChange, setThemeChange] = useState(user.settings.theme);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({ data: user }))
    console.log('add to local')
  }, [user])

  const postSetting = useCallback(async (name: string, value: string | boolean | number | number[]) => {
    try {
      const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/settings', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ user, name, value }),
      })
      const data = await res.json()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const uploadAvatar = useCallback(async (file: File, token: string) => {
    const formData = new FormData()
    formData.append('avatar', file)
    try {
      const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await res.json()
      console.log(json)
      return json
    } catch (error) {
      return error
    }
  }, [])

  const uploadName = useCallback(async (name: string, token: string) => {
    try {
      const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/name', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      })
      const json = await res.json()
      alert(json.message)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const postFeedback = useCallback(async (message: string, mail: string) => {
    try {
      const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/feedback', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, message }),
      })
      const json = await res.json()
      alert(json.message)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleChangeName = useCallback(() => {
    if (user.token !== '') {
      if (nameChange !== user.userName) {
        uploadName(nameChange, user.token)
        dispatch(setName(nameChange))
      }
    } else {
      alert('Вы не авторизованы')
    }
  }, [nameChange])

  const changeAvatar = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (user.token === '') {
        alert('Для загрузки фото необходимо авторизоваться.')
      }
      if (!event.target.files[0]) {
        alert('Выберите файл')
      }
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(event.target.files[0].type)) {
        alert('Разрешены только изображения')
      }
      if (event.target.files[0].size > 2 * 1024 * 1024) {
        alert('Аватарка должна быть менее 2МБ')
      }
      uploadAvatar(event.target.files[0], user.token)
        .then((res) => {
          dispatch(setAvatar(res.avatarURL))
          alert(res.message)
        })
        .catch((err) => {
          alert('Выберите другой файл')
        })
    }
  }, [])

  const handleSendSettings = useCallback(() => {
    if (user.token === '') {
      alert('Что бы сохранить настройки, войдите в аккаунт или зарегистрируйтесь')
    } else {
      const newSettings: ISettings = {
        settings: {
          difficultWord: difficultWordChange,
          deleteWord: deletedWordChange,
          translateWord: translateWordChange,
          translateSentences: translateSentencesChange,
          musicVolume: musicVolumeChange,
          soundVolume: soundVolumeChange,
          wordVolume: wordVolumeChange,
          theme: 'dark',
        },
      }
      Object.entries(newSettings.settings).forEach(([key, value]) => {
        postSetting(key, value)
      })
      dispatch(setSettings(newSettings))
      alert('Настройки сохранены')
    }
  }, [
    difficultWordChange,
    deletedWordChange,
    translateWordChange,
    translateSentencesChange,
    musicVolumeChange,
    soundVolumeChange,
    wordVolumeChange,
    dispatch,
    user,
  ])

  const handleExit = useCallback(() => {
    localStorage.removeItem('user')
    dispatch(
      setUser({
        token: '',
        userId: '',
        userName: '',
        userEmail: '',
        avatarURL: '',
        settings: {
          soundVolume: 0,
          musicVolume: 0,
          wordVolume: 50,
          difficultWord: true,
          deleteWord: true,
          translateWord: true,
          translateSentences: true,
          theme: 'dark',
        },
        userWords: [],
        statistics: {
          todayDate: '',
          learnedWordsTotal: 0,
          learnedWordsToday: 0,
          learnedWordsPerDate: [],
          percentToday: '0%',
          games: [
            {
              name: 'Саванна',
              longestSeries: 0,
              correctPercent: 0,
              wordsCount: 0,
            },
            {
              name: 'Составление',
              longestSeries: 0,
              correctPercent: 0,
              wordsCount: 0,
            },
            {
              name: 'Спринт',
              longestSeries: 0,
              correctPercent: 0,
              wordsCount: 0,
            },
            {
              name: 'Аудиовызов',
              longestSeries: 0,
              correctPercent: 0,
              wordsCount: 0,
            },
          ],
        },
        message: '',
      }),
    )
    setSoundVolumeChange(0)
    setMusicVolumeChange(0)
    setWordVolumeChange(50)
    setDifficultWordChange(true)
    setDeletedWordChange(true)
    setTranslateWordChange(true)
    setTranslateSentencesChange(true)
  }, [])

  return (
    <div className='profile'>
      <div className='profile__top'>
        <Box
          className='profile-item'
          sx={{
            width: 300,
            height: 300,
          }}
        >
          <div className='settings'>
            <h2>Отображение кнопок</h2>
            <div className='settings-btn__container'>
              <p>Сложные слова</p>
              <Switch
                onClick={() => {
                  setDifficultWordChange(!difficultWordChange)
                }}
                checked={difficultWordChange}
              />
            </div>
            <div className='settings-btn__container'>
              <p>Удалить Слово</p>
              <Switch onClick={() => setDeletedWordChange(!deletedWordChange)} checked={deletedWordChange} />
            </div>
            <h2>Перевод</h2>
            <div className='settings-btn__container'>
              <p>Перевод слов</p>
              <Switch onClick={() => setTranslateWordChange(!translateWordChange)} checked={translateWordChange} />
            </div>
            <div className='settings-btn__container'>
              <p>Перевод предложений</p>
              <Switch onClick={() => setTranslateSentencesChange(!translateSentencesChange)} checked={translateSentencesChange} />
            </div>
          </div>
        </Box>
        <Box
          className='profile-item'
          sx={{
            width: 300,
            height: 350,
          }}
        >
          <div className='settings'>
            <h2>Громкость музыки</h2>
            <div className='settings-btn__container__slide'>
              <Slider
                onChange={(e, value) => setMusicVolumeChange(value)}
                aria-label='Temperature'
                defaultValue={user.settings.musicVolume || 0}
                value={musicVolumeChange}
                valueLabelDisplay='on'
                step={10}
                marks
                min={0}
                max={100}
              />
            </div>
            <h2>Громкость звуков</h2>
            <div className='settings-btn__container__slide'>
              <Slider
                onChange={(e, value) => setSoundVolumeChange(value)}
                aria-label='Temperature'
                defaultValue={user.settings.soundVolume || 0}
                // getAriaValueText={valuetext}
                valueLabelDisplay='on'
                value={soundVolumeChange}
                step={10}
                marks
                min={0}
                max={100}
              />
            </div>
            <h2>Громкость произношения слов</h2>
            <div className='settings-btn__container__slide'>
              <Slider
                onChange={(e, value) => setWordVolumeChange(value)}
                aria-label='Temperature'
                defaultValue={user.settings.wordVolume || 50}
                // getAriaValueText={valuetext}
                value={wordVolumeChange}
                valueLabelDisplay='on'
                step={10}
                marks
                min={0}
                max={100}
              />
            </div>
          </div>
        </Box>
        <Box
          className='profile-item'
          sx={{
            width: 300,
            height: 400,
          }}
        >
          <div className='settings'>
            <Avatar
              className='avatar'
              src={user.avatarURL}
              sx={{
                height: 100,
                width: 100,
                margin: '20px auto',
              }}
            />
            <Button variant='contained' component='label'>
              Сменить аватар
              <input accept='.jpg, .jpeg, .png, .gif' type='file' onChange={(e) => changeAvatar(e)} hidden />
            </Button>
            <div className='change-name'>
              <TextField id='outlined-basic' label='Outlined' variant='outlined' onChange={(e) => setNameChange(e.currentTarget.value)} />
            </div>
            <Button variant='contained' component='label' onClick={() => handleChangeName()}>
              Сменить никнейм
            </Button>
            <p className='current-name'>Текущий никнейм:</p>
            <p>{user.userName}</p>
            <Button variant='contained' component='label' onClick={() => handleExit()}>
              Выход
            </Button>
          </div>
        </Box>
        <Box
          className='profile-item'
          sx={{
            width: 300,
            height: 300,
          }}
        >
          <div className='settings'>
            <h2>Связь с нами</h2>
            <p>Ваш email</p>
            <TextField
              id='filled-basic'
              label='Email'
              variant='filled'
              margin='normal'
              color='secondary'
              onChange={(e) => setFeedbackEmail(e.target.value)}
            />
            <p>Ваше сообщение</p>
            <TextField
              id='filled-basic'
              fullWidth
              label='Ваше сообщение'
              margin='normal'
              color='secondary'
              onChange={(e) => setFeedbackMessage(e.currentTarget.value)}
            />
          </div>
          <Button variant='contained' component='label' onClick={() => postFeedback(feedbackMessage, feedbackEmail)}>
            Отправить
          </Button>
        </Box>
      </div>
      <Button className='settings-accept__btn' variant='contained' component='label' onClick={() => handleSendSettings()}>
        <p>Преминить настройки</p>
      </Button>
    </div>
  )
}
