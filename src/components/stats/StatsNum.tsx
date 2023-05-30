import { useAppSelector } from '../../hooks/redux'
import { IUserStatistics } from '../../models/IUser'
import '../../style/stats/StatsNum.scss'
import { useEffect, useState } from 'react'

export function StatsNum() {
  const userStats = useAppSelector((state) => state.statisticsSlice)

  const { games } = userStats

  const [totalSprint, setTotalSprint] = useState(0)
  const [sprintPercent, setSprintPercent] = useState('')
  const [sprintBest, setSprintBest] = useState(0)
  const [audioTotal, setAudioTotal] = useState(0)
  const [audioPercent, setAudioPercent] = useState('')
  const [audioBest, setAudioBest] = useState(0)

  useEffect(() => {
    let sprintTotalWords = 0
    let sprintCorrectWords = 0
    let longestSeries = 0
    let audioTotalWords = 0
    let audioCorrectWords = 0
    let audioLongestSeries = 0

    games.forEach((game) => {
      if (game.gameName === 'sprint') {
        sprintTotalWords += game.totalWords
        sprintCorrectWords += (game.totalWords * game.correctPercent) / 100
        if (longestSeries < game.longestSeries) {
          longestSeries = game.longestSeries
        }
      } else if (game.gameName === 'audio') {
        audioTotalWords += game.totalWords
        audioCorrectWords += (game.totalWords * game.correctPercent) / 100
        if (audioLongestSeries < game.longestSeries) {
          audioLongestSeries = game.longestSeries
        }
      }
    })

    const sprintAccuracy = sprintCorrectWords / sprintTotalWords
    const sprintPercent = (sprintAccuracy * 100).toFixed(2) + '%'

    const audioAccuracy = audioCorrectWords / audioTotalWords
    const audioPercent = (audioAccuracy * 100).toFixed(2) + '%'

    setTotalSprint(sprintTotalWords)
    setSprintPercent(sprintPercent)
    setSprintBest(longestSeries)
    setAudioTotal(audioTotalWords)
    setAudioPercent(audioPercent)
    setAudioBest(audioLongestSeries)
  }, [totalSprint, sprintPercent, sprintBest, audioTotal, audioPercent, audioBest])

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
          <div className='statistics-content__table-item-title'>Спринт</div>
          <div className='statistics-content__table-item-title'>{totalSprint}</div>
          <div className='statistics-content__table-item-title'>{sprintPercent}</div>
          <div className='statistics-content__table-item-title'>{sprintBest}</div>
        </div>
        <div className='statistics-content__table-item'>
          <div className='statistics-content__table-item-title'>Аудиовызов</div>
          <div className='statistics-content__table-item-title'>{audioTotal}</div>
          <div className='statistics-content__table-item-title'>{audioPercent}</div>
          <div className='statistics-content__table-item-title'>{audioBest}</div>
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
          <div className='statistics-content__table-down-item-title'>{`${userStats.learnedWordsToday}`}</div>
        </div>
        <div className='statistics-content__table-down-item'>
          <div className='statistics-content__table-down-item-title'>Процент правильных ответов:</div>
          <div className='statistics-content__table-down-item-title'>{`${userStats.percentToday}`}</div>
        </div>
      </div>
    </div>
  )
}
