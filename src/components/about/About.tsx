import { AboutCard } from './AboutCard'
import '../../style/about/About.scss'
import diffick from '../../assets/aboutImages/diffick.jpg'

export function About() {
  return (
    <div className='about'>
      <div className='about__container'>
        <div className='about__title'>
          <h1>О нашей команде</h1>
        </div>
        <div className='about__cards'>
          <div className='about__cards__grid'>
            <AboutCard
              currentImage={diffick}
              currentText={'Разработал Back-end, Главную страницу , Настройки , Профиль , О команде, Учебник, Игры, Статистику.'}
              currentTitle={'Фиштик Илья'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
