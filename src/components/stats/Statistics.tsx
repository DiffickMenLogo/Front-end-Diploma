import { Button, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StatsGraph } from './StatsGraph'
import { StatsNum } from './StatsNum'
import '../../style/stats/Statistics.scss'
import { userSlice } from '../../store/reducers/UserSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IUserStatistics } from '../../models/IUser'
import { statsAPI } from '../../services/PostService'
import { statisticsSlice } from '../../store/reducers/StatisticsSlice'

export function Statistics() {
  const user = useAppSelector((state) => state.userSlice)
  const skip = useAppSelector((state) => state.authSlice.skip)

  const dispatch = useAppDispatch()
  const setGames = statisticsSlice.actions.setGames

  const { data, isLoading } = statsAPI.useGetStatsQuery(user.id, {
    skip,
  })

  const [render, setRender] = useState<boolean>(true)

  useEffect(() => {
    if (data) {
      dispatch(setGames(data))
      console.log(data)
      setRender(false)
    }
  }, [data])

  const [statsNow, setStatsNow] = useState('num')

  return isLoading && render ? (
    <CircularProgress
      sx={{
        margin: '0 auto',
      }}
    />
  ) : (
    <div className='statistics'>
      <h2>Статистика</h2>
      <div className='statistics__change'>
        <Button
          sx={{
            width: 200,
            fontSize: 20,
            backgroundColor: '#1177d4',
            '&:hover': {
              backgroundColor: '#77b0d8',
            },
          }}
          variant='contained'
          onClick={() => setStatsNow('num')}
          className='statistics__change-item'
        >
          В цифрах
        </Button>
        <Button
          sx={{
            width: 200,
            fontSize: 20,
            backgroundColor: '#1177d4',
            '&:hover': {
              backgroundColor: '#77b0d8',
            },
          }}
          variant='contained'
          onClick={() => setStatsNow('graph')}
          className='statistics__change-item'
        >
          Графики
        </Button>
      </div>
      {statsNow === 'num' ? <StatsNum /> : <StatsGraph />}
    </div>
  )
}
