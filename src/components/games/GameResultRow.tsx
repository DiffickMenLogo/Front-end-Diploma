import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { IWord } from '../../models/IWord'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { createSound } from './Sprint'
import { useAppSelector } from '../../hooks/redux'

interface IGameResultRow {
  answer: IWord
  backgroundColor: string
}

export const GameResultRow = ({ answer, backgroundColor }: IGameResultRow) => {
  const { wordVolume } = useAppSelector((state) => state.levelSlice.settings)

  const { word, wordTranslate, audio, transcription } = answer
  const playSound = (event: React.MouseEvent<HTMLButtonElement>) => {
    const path = event.currentTarget.value
    const audioWord = createSound(`https://rs-lang-back-diffickmenlogo.herokuapp.com/${path}`, wordVolume, 0.9)
    Howler.stop()
    audioWord.play()
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: { backgroundColor } }}>
        <TableCell align='left' sx={{ fontSize: '1.8rem', fontWeight: 500 }}>
          {word}
        </TableCell>
        <TableCell align='left' sx={{ fontSize: '1.8rem', fontWeight: 500 }}>
          {transcription}
        </TableCell>
        <TableCell align='left' sx={{ fontSize: '1.8rem', fontWeight: 500 }}>
          {wordTranslate}
        </TableCell>
        <TableCell align='left' sx={{ fontSize: '1.8rem', fontWeight: 500 }}>
          <button style={{ background: 'border-box' }} value={audio} onClick={playSound}>
            <PlayCircleOutlineIcon
              sx={{
                fontSize: '3.5rem',
                transition: 'all 0.5s ease 0s',
                '&:hover': { transform: 'scale(1.1)', transition: 'all 0.5s ease 0s' },
              }}
            />
          </button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
