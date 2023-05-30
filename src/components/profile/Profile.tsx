import { Alert, Avatar, Box, Button, CircularProgress, Container, Slider, Snackbar, Switch, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ISettings, ISettingsValue, IUser } from '../../models/IUser'
import { settingsAPI, userAPI } from '../../services/PostService'
import { userSlice } from '../../store/reducers/UserSlice'
import '../../style/profile/Profile.scss'
import { settingsSlice } from '../../store/reducers/SettingsSlice'
import { statisticsSlice } from '../../store/reducers/StatisticsSlice'
import { authSlice } from '../../store/reducers/IsLoginSlice'
import { useNavigate } from 'react-router-dom'
import { userWordsSlice } from '../../store/reducers/UserWords'

export function Profile() {
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.userSlice) as IUser
  const settings = useAppSelector((state) => state.settingsSlice) as ISettings

  const [updateSettings] = settingsAPI.useUpdateSettingsMutation()
  const [changeName] = userAPI.useChangeNameMutation()

  const setSettings = settingsSlice.actions.setSettings
  const setName = userSlice.actions.setName
  const deleteUser = userSlice.actions.deleteUser
  const deleteStats = statisticsSlice.actions.deleteStats
  const deleteUserWOrds = userWordsSlice.actions.deleteUserWords
  const deleteSettings = settingsSlice.actions.deleteSettings
  const deleteToken = authSlice.actions.clearToken
  const clearSkip = authSlice.actions.clearSkip
  const dispatch = useAppDispatch()

  const [difficultWordChange, setDifficultWordChange] = useState<boolean>(settings.userId !== '' ? settings.difficultWord : true)
  const [deletedWordChange, setDeletedWordChange] = useState<boolean>(settings.userId !== '' ? settings.deleteWord : true)
  const [translateWordChange, setTranslateWordChange] = useState<boolean>(settings.userId !== '' ? settings.translateWord : true)
  const [translateSentencesChange, setTranslateSentencesChange] = useState<boolean>(settings.userId !== '' ? settings.translateSentences : true)
  const [musicVolumeChange, setMusicVolumeChange] = useState<number | number[]>(settings.userId !== '' ? settings.musicVolume : 0)
  const [soundVolumeChange, setSoundVolumeChange] = useState<number | number[]>(settings.userId !== '' ? settings.soundVolume : 0)
  const [wordVolumeChange, setWordVolumeChange] = useState<number | number[]>(settings.userId !== '' ? settings.wordVolume : 50)
  const [nameChange, setNameChange] = useState<string>(user.id !== '' ? user.name : '')
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertText, setAlertText] = useState<string>('')

  const handleAlertClose = () => {
    setShowAlert(false)
  }

  const handleChangeName = useCallback(() => {
    changeName({ name: nameChange, id: user.id })
      .unwrap()
      .then(() => {
        dispatch(setName(nameChange))
        const newUser = JSON.parse(localStorage.getItem('user') || '') as IUser
        newUser.name = nameChange
        localStorage.setItem('user', JSON.stringify(newUser))
        setAlertText('Вы сменили имя!')
        setShowAlert(true)
      })
      .catch(() => {
        setAlertText('Не удалось сменить имя. Попробуйте ещё раз')
        setShowAlert(true)
      })
  }, [nameChange])

  const handleSendSettings = useCallback(async () => {
    const newSettings: ISettings = {
      userId: user.id,
      difficultWord: difficultWordChange,
      deleteWord: deletedWordChange,
      translateWord: translateWordChange,
      translateSentences: translateSentencesChange,
      musicVolume: musicVolumeChange as number,
      soundVolume: soundVolumeChange as number,
      wordVolume: wordVolumeChange as number,
      theme: 'dark',
    }
    await updateSettings(newSettings)
      .unwrap()
      .then(() => {
        dispatch(setSettings(newSettings))
        localStorage.setItem('settings', JSON.stringify(newSettings))
        setAlertText('Настройки сохранены')
        setShowAlert(true)
      })
      .catch((e) => {
        setAlertText('Что бы сохранить настройки, войдите в аккаунт или зарегистрируйтесь')
        setShowAlert(true)
      })
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
    localStorage.clear()
    dispatch(deleteToken())
    dispatch(deleteUser())
    dispatch(deleteSettings())
    dispatch(deleteStats())
    dispatch(deleteUserWOrds())
    dispatch(clearSkip())
    console.log('exit')
    navigate('/signin')
  }, [])

  return (
    <div className='profile'>
      <Snackbar open={showAlert} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          sx={{
            backgroundColor: (theme) => theme.palette.success.main,
            color: (theme) => theme.palette.success.contrastText,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            padding: (theme) => theme.spacing(2),
          }}
          severity='success'
        >
          {alertText}
        </Alert>
      </Snackbar>
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
              <p>Изученные слова</p>
              <Switch
                onClick={() => {
                  setDifficultWordChange(!difficultWordChange)
                }}
                checked={difficultWordChange}
              />
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
                defaultValue={settings.musicVolume || 0}
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
                defaultValue={settings.soundVolume || 0}
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
                defaultValue={settings.wordVolume || 50}
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
            <div className='change-name'>
              <TextField id='outlined-basic' label='Outlined' variant='outlined' onChange={(e) => setNameChange(e.currentTarget.value)} />
            </div>
            <Button
              sx={{
                fontFamily: 'Comic Neue, cursive',
              }}
              variant='contained'
              component='label'
              onClick={() => handleChangeName()}
            >
              Сменить никнейм
            </Button>
            <p className='current-name'>Текущий никнейм:</p>
            <p>{user.name}</p>
            <Button
              sx={{
                fontFamily: 'Comic Neue, cursive',
              }}
              variant='contained'
              component='label'
              onClick={() => handleExit()}
            >
              Выход
            </Button>
          </div>
        </Box>
      </div>
      <Button
        className='settings-accept__btn'
        variant='contained'
        component='label'
        sx={{
          fontFamily: 'Comic Neue, cursive',
          letterSpacing: '0.06em',
          fontWeigth: 'bold',
        }}
        onClick={() => handleSendSettings()}
      >
        <p>Применить настройки</p>
      </Button>
    </div>
  )
}
