import { useCallback, useEffect } from 'react'
import '../../style/GameResult.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IWord } from '../../models/IWord'
import { Howler } from 'howler'
import { Table, TableCell, TableHead, TableRow, TableBody, Box, TableContainer, Paper, Button } from '@mui/material'
import { GameResultRow } from './GameResultRow'
import { Link } from 'react-router-dom'
import { IFullUser } from '../../models/IUser'
import { userSlice } from '../../store/reducers/UserSlice'

interface IGameStats {
  allSeries: number[]
  failAnswers: IWord[]
  correctAnswers: IWord[]
  gameName: string
  lifes?: number
  score?: number
}

interface ISettings {
  user: IFullUser
  gameName: string
  correctAnswers: IWord[]
  failAnswers: IWord[]
  allSeries: number[]
}

function getMaxOfArray(numArray: number[]) {
  return Math.max.apply(null, numArray)
}

export const GameResult = ({ allSeries, correctAnswers, failAnswers, lifes, gameName, score }: IGameStats) => {
  const user = useAppSelector((state) => state.userSlice) as IFullUser
  const dispatch = useAppDispatch()
  const setStatistics = userSlice.actions.setStatistics

  const postStats = useCallback(async (settings: ISettings) => {
    try {
      const config = {
        method: 'POST',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${settings.user.token}`,
        },
        body: JSON.stringify({
          userName: settings.user.userName,
          gameName: settings.gameName,
          correctArr: settings.correctAnswers,
          failArr: settings.failAnswers,
          seriesArr: settings.allSeries,
        }),
      }
      const response = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/statistics', config)
      const data = await response.json()
      dispatch(setStatistics(data))
      return console.log(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const sendUserStats = useCallback(async () => {
    if (!user.token) {
      return alert('Статистика не была обновлена, авторизуйтесь')
    }
    if (!correctAnswers.length && !failAnswers.length) return
    await postStats({ user, gameName, correctAnswers, failAnswers, allSeries })
  }, [])

  useEffect(() => {
    Howler.stop()
    sendUserStats()
  }, [correctAnswers.length, failAnswers.length, lifes, sendUserStats])

  return (
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
