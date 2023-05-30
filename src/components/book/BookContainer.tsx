import React, { useCallback, useEffect, useState } from 'react'
import { IUserWord, IWord, IWordState } from '../../models/IWord'
import { postAPI, userWordsAPI } from '../../services/PostService'
import { Book } from './Book'
import '../../style/words.scss'
import { Alert, Button, ButtonGroup, CircularProgress, Pagination, Snackbar, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { wordSlice } from '../../store/reducers/WordSlice'
import { useDispatch } from 'react-redux'
import { current } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { setLevelAndPage } from '../../store/reducers/ActionCreaters'
import { userSlice } from '../../store/reducers/UserSlice'
import { ISettings, IUser } from '../../models/IUser'
import { userWordsSlice } from '../../store/reducers/UserWords'

export const BookContainer = () => {
  const dispatch = useAppDispatch()
  const setUserWords = userWordsSlice.actions.setWords

  const user = useAppSelector((state) => state.userSlice) as IUser
  const settings = useAppSelector((state) => state.settingsSlice) as ISettings
  const skip = useAppSelector((state) => state.authSlice.skip)
  const userWords = useAppSelector((state) => state.userWordsSlice)

  const token = localStorage.getItem('accessToken') || ''

  const [page, setPage] = useState<number>(Number(localStorage.getItem('page')) || 0)
  const [group, setGroup] = useState<number>(Number(localStorage.getItem('group')) || 0)
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  const stage = ['Beginner(A1)', 'Pre - Intermediate(A2)', 'Intermediate(B1)', 'Upper-Intermediate(B2)', 'Advanced(C1)', 'Mastery(C2)']

  const { data: words, isLoading } = postAPI.useGetWordsQuery({ page, group })

  const { data: userWordsFromApi, isLoading: userWordsLoading } = userWordsAPI.useGetUserWordsQuery(user.id, {
    skip,
  })

  useEffect(() => {
    localStorage.setItem('page', String(page))
    localStorage.setItem('group', String(group))
  }, [])

  useEffect(() => {
    if (userWordsFromApi) {
      console.log(userWordsFromApi)
      dispatch(setUserWords(userWordsFromApi))
    }
  }, [userWordsFromApi])

  return (
    <div className='wrapper'>
      <Typography
        sx={{
          fontSize: '16px',
          margin: '20px',
          fontFamily: 'Comic Neue',
          fontWeight: 600,
        }}
      >
        {stage[group]}
      </Typography>
      <div className='game-btn__container'>
        <button className='game__btn'>
          <Link to='/games/sprint' onClick={() => dispatch(setLevelAndPage({ group, page }))}>
            Спринт
          </Link>
        </button>
        <button className='game__btn'>
          <Link to='/games/audio_chalenge' onClick={() => dispatch(setLevelAndPage({ group, page }))}>
            Аудиовызов
          </Link>
        </button>
      </div>
      <div className={token ? 'btn-difficult-con' : 'btn-difficult-block'}>
        <Link to='/book/difficult' className={settings.difficultWord ? 'btn-difficult' : 'btn-difficult-block'}>
          Изученные слова
        </Link>
      </div>
      <ButtonGroup
        variant='contained'
        size='large'
        aria-label='outlined primary button group'
        sx={{
          margin: '20px',
        }}
      >
        <Button
          sx={{
            margin: '20px',
          }}
          onClick={() => {
            setGroup(0)
          }}
        >
          Beginner(A1)
        </Button>
        <Button
          sx={{
            margin: '20px',
          }}
          onClick={() => {
            setGroup(1)
          }}
        >
          Pre-Intermediate(A2)
        </Button>
        <Button
          sx={{
            margin: '20px',
          }}
          onClick={() => {
            setGroup(2)
          }}
        >
          Intermediate(B1)
        </Button>
        <Button
          sx={{
            margin: '20px',
          }}
          onClick={() => {
            setGroup(3)
          }}
        >
          Upper-Intermediate(B2)
        </Button>
        <Button
          sx={{
            margin: '20px',
          }}
          onClick={() => {
            setGroup(4)
          }}
        >
          Advanced(C1)
        </Button>
        <Button
          sx={{
            margin: '20px',
          }}
          onClick={() => {
            setGroup(5)
          }}
        >
          Mastery(C2)
        </Button>
      </ButtonGroup>
      {isLoading && userWordsLoading ? (
        <CircularProgress />
      ) : (
        <div className='words-wrapper'>{words && words.map((word: IWord) => <Book key={word.id} word={word} />)}</div>
      )}
      <div className='pages'>
        {pages.map((el, index) => (
          <span
            key={index}
            className={page == index ? 'current-page' : 'page'}
            onClick={() => {
              setPage(index)
            }}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  )
}
