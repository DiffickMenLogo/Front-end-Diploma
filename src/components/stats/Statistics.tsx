import { Button } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StatsGraph } from './StatsGraph'
import { StatsNum } from './StatsNum'
import '../../style/stats/Statistics.scss'
import { userSlice } from '../../store/reducers/UserSlice'
import { useAppSelector } from '../../hooks/redux'
import { IUserStatistics } from '../../models/IUser'

export function Statistics() {
  const [statsNow, setStatsNow] = useState('num')
  const userStatistics = useAppSelector((state) => state.userSlice.statistics) as IUserStatistics

  return (
    <div className='statistics'>
      <h2>Статистика</h2>
      <div className='statistics__change'>
        <Button
          sx={{
            width: 200,
            fontSize: 20,
            backgroundColor: '#560EAD',
            '&:hover': {
              backgroundColor: '#8643D6',
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
            backgroundColor: '#560EAD',
            '&:hover': {
              backgroundColor: '#8643D6',
            },
          }}
          variant='contained'
          onClick={() => setStatsNow('graph')}
          className='statistics__change-item'
        >
          Графики
        </Button>
      </div>
      {statsNow === 'num' ? <StatsNum userStatistics={userStatistics} /> : <StatsGraph userStatistics={userStatistics} />}
    </div>
  )
}
