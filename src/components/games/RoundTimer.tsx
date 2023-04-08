import React, { useEffect, useRef } from 'react'
import '../../style/RoundTimer.scss'

function setCircleTimer(num: number, maxNum: number) {
  const circumference = 2 * Math.PI * 52
  const percent = 100 - ((maxNum - num) / maxNum) * 100
  const offset = circumference - (percent / 100) * circumference
  return offset
}

export const RoundTimer = ({ seconds }: { seconds: number }) => {
  const circleRef = useRef() as React.MutableRefObject<SVGCircleElement>

  useEffect(() => {
    circleRef.current.style.strokeDashoffset = String(setCircleTimer(seconds, 60))
  }, [seconds])

  return (
    <div className='timer__container'>
      <svg width='120' height='120'>
        <circle
          ref={circleRef}
          className='timer__circle'
          stroke='#b8f75e'
          strokeWidth='15'
          cx='60'
          cy='60'
          r='52'
          fill='transparent'
          strokeDasharray={`${2 * Math.PI * 52} ${2 * Math.PI * 52}`}
          strokeDashoffset={`${2 * Math.PI * 52}`}
        />
      </svg>
      <div className='timer__text-wrap'>
        <span>{seconds}</span>
      </div>
    </div>
  )
}
