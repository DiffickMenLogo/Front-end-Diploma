import React from 'react'
import '../style/Footer.scss'
import { ReactComponent as Git } from '../assets/github-icon.svg'
import logo from '../assets/logo_BrSTU.png'

export default function Footer() {
  return (
    <footer>
      <div className='wrapper'>
        <div className='footer__container'>
          <div className='footer-year'>
            <p>© 2023 BSTULang</p>
          </div>
          <div className='footer-gitHub'>
            <Git fill='#fff' />
            <a href='https://github.com/diffickmenlogo'>DiffickMenLogo</a>
          </div>
          <a href='https://www.bstu.by'>
            <img
              src={logo}
              alt='Your Logo'
              style={{
                borderRadius: '10px',
                width: '100px',
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
