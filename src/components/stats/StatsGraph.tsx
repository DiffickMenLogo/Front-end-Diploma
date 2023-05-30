import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts'
import { IUserStatistics } from '../../models/IUser'
import '../../style/stats/StatsGraph.scss'
import { useAppSelector } from '../../hooks/redux'
import { useEffect, useState } from 'react'

export function StatsGraph() {
  const userStats = useAppSelector((state) => state.statisticsSlice)

  const { games } = userStats

  const [totalAudio, setTotalAudio] = useState(0)
  const [totalSprint, setTotalSprint] = useState(0)

  useEffect(() => {
    let audio = 0
    let sprint = 0

    games.forEach((game) => {
      if (game.gameName === 'sprint') {
        sprint += game.totalWords
      } else {
        audio += game.totalWords
      }
    })

    setTotalSprint(sprint)
    setTotalAudio(audio)
  }, [totalAudio, totalSprint])

  const dataGames = [
    { name: 'Спринт', Слова: +`${totalSprint}` },
    { name: 'Аудивызов', Слова: +`${totalAudio}` },
  ]

  const dataAll = userStats.learnedWordsPerDate.map((day) => ({ date: day.date, Слова: day.words }))
  return (
    <div className='statistics-content'>
      <h3>Игры</h3>
      <div className='chart-games'>
        <BarChart width={600} height={300} data={dataGames}>
          <XAxis dataKey='name' stroke='#4175ef' />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <Bar dataKey='Слова' fill='#4175ef' barSize={30} />
        </BarChart>
      </div>
      <h3>Всего изучено слов по дням</h3>
      <div className='chart-all'>
        <LineChart width={600} height={300} data={dataAll} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type='monotone' dataKey='Слова' stroke='#4175ef' />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  )
}
