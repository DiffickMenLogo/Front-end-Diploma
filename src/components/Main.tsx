import React from 'react'
import '../style/Main.scss'
import img from '../assets/main.jpg'
import { ReactComponent as Res } from '../assets/results-icon.svg'
import { ReactComponent as Unit } from '../assets/unti-icon.svg'
import { ReactComponent as Game } from '../assets/game-icon.svg'
import { ReactComponent as Dicti } from '../assets/dictionary-icon.svg'

export default function Main() {
  return (
    <main>
      <section>
        <div className='wrapper'>
          <div className='main__container'>
            <div className='main__text'>
              <h2 className='main__text_header'>BSTU Lang </h2>
              <p className='main__text_text'> — это эффективный сервис для увлекательной практики языков</p>
              <h4 className='main__text-subtitile'>Преимущества</h4>
              <div className='main-benefits__container'>
                <div className='results container'>
                  <div className='icon'>
                    <Res width='60px' />
                  </div>
                  <div>
                    <h5>Результаты</h5>
                    <p className='main__text_sub'>Статитика по дням</p>
                  </div>
                </div>
                <div className='unit container'>
                  <div className='icon'>
                    <Unit width='60px' height='45px' />
                  </div>
                  <div>
                    <h5>Разделов</h5>
                    <p className='main__text_sub'>Возрастающая сложность</p>
                  </div>
                </div>
                <div className='game container'>
                  <div className='icon'>
                    <Game width='60px' height='60px' />
                  </div>
                  <div>
                    <h5>2 игры</h5>
                    <p className='main__text_sub'>Интересно и полезно</p>
                  </div>
                </div>
                <div className='dictionary container'>
                  <div className='icon'>
                    <Dicti width='60px' height='50px' />
                  </div>
                  <div>
                    <h5>Словарь</h5>
                    <p className='main__text_sub'>на основе ваших достижений</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-img__container'>
              <img src={img} alt='' className='main__img' />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
