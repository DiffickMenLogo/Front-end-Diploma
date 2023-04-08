import { IUserStatistics } from '../../models/IUser'
import '../../style/stats/StatsNum.scss'

export function StatsNum({ userStatistics }: { userStatistics: IUserStatistics }) {
  const { games } = userStatistics
  return (
    <div className='statistics-content'>
      <h3>Успехи в играх</h3>
      <div className='statistics-content__table'>
        <div className='statistics-content__table-item'>
          <div className='statistics-content__table-item-title'>Игра</div>
          <div className='statistics-content__table-item-title'>Количество изученных слов</div>
          <div className='statistics-content__table-item-title'>Процент правильных ответов</div>
          <div className='statistics-content__table-item-title'>Лучшая серия</div>
        </div>
        <div className='statistics-content__table-item'>
          <div className='statistics-content__table-item-title'>{`${games[2].name}`}</div>
          <div className='statistics-content__table-item-title'>{`${games[2].wordsCount}`}</div>
          <div className='statistics-content__table-item-title'>{`${games[2].correctPercent}%`}</div>
          <div className='statistics-content__table-item-title'>{`${games[2].longestSeries}`}</div>
        </div>
        <div className='statistics-content__table-item'>
          <div className='statistics-content__table-item-title'>{`${games[3].name}`}</div>
          <div className='statistics-content__table-item-title'>{`${games[3].wordsCount}`}</div>
          <div className='statistics-content__table-item-title'>{`${games[3].correctPercent}%`}</div>
          <div className='statistics-content__table-item-title'>{`${games[3].longestSeries}`}</div>
        </div>
      </div>
      <h3>Общее за день</h3>
      <div className='statistics-content__table-down'>
        <div className='statistics-content__table-down-item'>
          <div className='statistics-content__table-down-item-title'>Название</div>
          <div className='statistics-content__table-down-item-title'>Значение</div>
        </div>
        <div className='statistics-content__table-down-item'>
          <div className='statistics-content__table-down-item-title'>Изученных слов:</div>
          <div className='statistics-content__table-down-item-title'>{`${userStatistics.learnedWordsToday}`}</div>
        </div>
        <div className='statistics-content__table-down-item'>
          <div className='statistics-content__table-down-item-title'>Процент правильных ответов:</div>
          <div className='statistics-content__table-down-item-title'>{`${userStatistics.percentToday}`}</div>
        </div>
      </div>
    </div>
  )
}
