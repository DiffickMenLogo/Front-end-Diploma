import { useCallback, useEffect, useState } from 'react'
import '../../style/GameResult.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IWord } from '../../models/IWord'
import { Howler } from 'howler'
import { Table, TableCell, TableHead, TableRow, TableBody, Box, TableContainer, Paper, Button, CircularProgress } from '@mui/material'
import { GameResultRow } from './GameResultRow'
import { Link, useNavigate } from 'react-router-dom'
import { userSlice } from '../../store/reducers/UserSlice'
import { statisticsSlice } from '../../store/reducers/StatisticsSlice'
import { IUser } from '../../models/IUser'
import { statsAPI, userWordsAPI } from '../../services/PostService'

interface IGameStats {
  allSeries: number[]
  failAnswers: IWord[]
  correctAnswers: IWord[]
  gameName: string
  lifes?: number
  score?: number
}

interface ISettings {
  user: IUser
  gameName: string
  correctAnswers: IWord[]
  failAnswers: IWord[]
  allSeries: number[]
}

function getMaxOfArray(numArray: number[]) {
  return Math.max.apply(null, numArray)
}

export const GameResult = ({ allSeries, correctAnswers, failAnswers, lifes, gameName, score }: IGameStats) => {
  const user = useAppSelector((state) => state.userSlice)

  const { data: userWords, isLoading } = userWordsAPI.useGetUserWordsQuery(user.id)
  const [changeUserWord] = userWordsAPI.usePutWordMutation()
  const [addNewUserWord] = userWordsAPI.useAddWordMutation()
  const [postStats] = statsAPI.usePostStatsMutation()

  const [sendingsWords, setSendingsWords] = useState(true)

  const sendUserStats = useCallback(async () => {
    if (correctAnswers.length && failAnswers.length) {
      return postStats({
        userId: user.id,
        gameName,
        longestSeries: Math.max(...allSeries),
        totalWords: correctAnswers.length + failAnswers.length,
        correctPercent: Math.floor((correctAnswers.length / (correctAnswers.length + failAnswers.length)) * 100),
        date: new Date().toISOString(),
      })
        .then(() => {
          alert('Статистика обновлена')
        })
        .catch(() => {
          alert('Ошибка обновления статистики. Возможно вы не авторизированны')
        })
    }
  }, [correctAnswers, failAnswers, postStats, user.id, gameName, allSeries])

  const addWords = useCallback(async () => {
    try {
      correctAnswers.forEach(async (word) => {
        if (userWords !== undefined) {
          const matchedUserWord = userWords.find((userWord) => userWord.id === word.id)
          const realWord = {
            ...word,
            userId: user.id,
          }
          if (matchedUserWord) {
            realWord.correct += 1
            await changeUserWord(realWord)
          } else {
            realWord.correct = 1
            await addNewUserWord(realWord)
          }
        }
      })
      failAnswers.forEach(async (word) => {
        if (userWords !== undefined) {
          const matchedUserWord = userWords.find((userWord) => userWord.id === word.id)
          const realWord = {
            ...word,
            userId: user.id,
          }
          if (matchedUserWord) {
            realWord.fail += 1
            await changeUserWord(realWord)
          } else {
            realWord.fail = 1
            await addNewUserWord(realWord)
          }
        }
      })
    } finally {
      setSendingsWords(false)
    }
  }, [correctAnswers, failAnswers, changeUserWord, addNewUserWord, userWords])

  useEffect(() => {
    Howler.stop()
    sendUserStats()
  }, [correctAnswers.length, failAnswers.length, lifes, sendUserStats])

  useEffect(() => {
    console.log(userWords, 'user')
    if (userWords) {
      addWords()
    }
  }, [userWords])

  return isLoading || sendingsWords ? (
    <CircularProgress />
  ) : (
    <div className='game-result__container'>
      <h1 className='game-result__title'>Результаты:</h1>
      {score ? (
        <h2 className='game-result__series-title'>
          Вы набрали: <span className='game-result__series-number'>{`${score} очков`}</span>
        </h2>
      ) : (
        ''
      )}
      <h2 className='game-result__series-title'>
        Максимальная длинна серии: <span className='game-result__series-number'>{`${allSeries.length ? getMaxOfArray(allSeries) : 0}`}</span>
      </h2>
      <TableContainer component={Paper} sx={{ maxHeight: 335, margin: '20px auto' }}>
        <Table sx={{ minWidth: 320 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'rgb(17, 169, 17)', fontSize: '2.2rem' }}>{`Правильно: ${correctAnswers.length}`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {correctAnswers.map((correctAnswer) => (
              <GameResultRow key={correctAnswer.word} answer={correctAnswer} backgroundColor='rgb(17, 169, 17)' />
            ))}
            <TableRow>
              <TableCell sx={{ color: 'rgb(241, 52, 52)', fontSize: '2.2rem' }}>{`Не правильно: ${failAnswers.length}`}</TableCell>
            </TableRow>
            {failAnswers.map((failAnswer) => (
              <GameResultRow key={failAnswer.word} answer={failAnswer} backgroundColor='rgb(241, 52, 52)' />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '20px' }}>
        <Button
          sx={{
            width: 110,
            height: 45,
            backgroundColor: '#9b6ad6',
            fontSize: 15,
            transform: 'scale(1)',
            color: '#fff',
            transition: 'all 0.5s ease 0s',
            padding: 0,
            '&:hover': { transform: 'scale(1.1)', transition: 'all 0.5s ease 0s', background: 'rgba(233, 214, 255, 0.8235294118)' },
            '& a': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              color: '#fff',
              '&:hover': {
                color: '#9b6ad6',
              },
            },
          }}
        >
          <Link to='/games/'>Выбор игры</Link>
        </Button>
      </Box>
    </div>
  )
}
