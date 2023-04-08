import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts'
import { IUserStatistics } from '../../models/IUser'
import '../../style/stats/StatsGraph.scss'

export function StatsGraph({ userStatistics }: { userStatistics: IUserStatistics }) {
  const { games } = userStatistics
  const dataGames = [
    { name: `${games[2].name}`, Слова: +`${games[2].wordsCount}` },
    { name: `${games[3].name}`, Слова: +`${games[3].wordsCount}` },
  ]

  const dataAll = userStatistics.learnedWordsTotal.map((day) => ({ date: day.date, Слова: day.words }))
  return (
    <div className='statistics-content'>
      <h3>Игры</h3>
      <div className='chart-games'>
        <BarChart width={600} height={300} data={dataGames}>
          <XAxis dataKey='name' stroke='#8884d8' />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <Bar dataKey='Слова' fill='#8884d8' barSize={30} />
        </BarChart>
      </div>
      <h3>Всего изучено слов по дням</h3>
      <div className='chart-all'>
        <LineChart width={600} height={300} data={dataAll} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type='monotone' dataKey='Слова' stroke='#8884d8' />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  )
}
