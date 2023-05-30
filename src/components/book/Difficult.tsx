import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { IUser } from '../../models/IUser'
import { Book } from './Book'
import { userWordsSlice } from '../../store/reducers/UserWords'
import { userWordsAPI } from '../../services/PostService'
import { CircularProgress } from '@mui/material'
import { IWord } from '../../models/IWord'

export const Difficult = () => {
  const dispatch = useDispatch()
  const setUserWOrds = userWordsSlice.actions.setWords

  const user = useAppSelector((state) => state.userSlice) as IUser
  const userWords = useAppSelector((state) => state.userWordsSlice.words)
  const skip = useAppSelector((state) => state.authSlice.skip)

  const { data, isLoading } = userWordsAPI.useGetUserWordsQuery(user.id, {
    skip,
  })

  useEffect(() => {
    if (data) {
      dispatch(setUserWOrds(data))
    }
  }, [data])

  return (
    <div className='wrapper'>
      <h2>Сложные слова</h2>
      <div className='cards-container'>
        {isLoading ? (
          <CircularProgress />
        ) : (
          userWords.map((word: IWord) => {
            if (word.correct >= 3) {
              return <Book key={word.id} word={word} />
            }
          })
        )}
      </div>
    </div>
  )
}
