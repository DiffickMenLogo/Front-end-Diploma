import React from 'react'
import '../style/Footer.scss'
import { ReactComponent as Git } from '../assets/github-icon.svg'
import { ReactComponent as RSlogo } from '../assets/rs_school_js.svg'

export default function Footer() {
  return (
    <footer>
      <div className='wrapper'>
        <div className='footer__container'>
          <div className='footer-year'>
            <p>© 2022 RSLang</p>
          </div>
          <div className='footer-gitHub'>
            <Git fill='#fff' />
            <a href='https://github.com/yuliaN145'>YuliaN145</a>
            <a href='https://github.com/gremlin654'>gremlin654</a>
            <a href='https://github.com/diffickmenlogo'>diffickmenlogo</a>
          </div>
          <a href='https://rs.school/js/'>
            <RSlogo width='100px' fill='#fff' />
          </a>
        </div>
      </div>
    </footer>
  )
}
