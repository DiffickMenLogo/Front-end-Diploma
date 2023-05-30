import React, { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { IWord } from '../../models/IWord'
import { Howl } from 'howler'
import '../../style/words.scss'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ReactComponent as Sound } from '../../assets/iconmonstr-sound-thin.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ReactComponent as Star } from '../../assets/star2.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { useDispatch } from 'react-redux'
import { userSlice } from '../../store/reducers/UserSlice'
import { userWordsSlice } from '../../store/reducers/UserWords'
import { ISettings, IUser } from '../../models/IUser'
import { postAPI, settingsAPI, userWordsAPI } from '../../services/PostService'
import { soundPlayerSlice } from '../../store/reducers/SoundPlayerSlice'

interface ElItemProps {
  word: IWord
}

export const Book = ({ word }: ElItemProps) => {
  const user = useAppSelector((state) => state.userSlice) as IUser
  const settings = useAppSelector((state) => state.settingsSlice) as ISettings
  const nowPlay = useAppSelector((state) => state.soundPlayerSlice.nowPlaying)
  const userWords = useAppSelector((state) => state.userWordsSlice.words)

  const dispatch = useDispatch()
  const startPlay = soundPlayerSlice.actions.startPlay
  const stopPlay = soundPlayerSlice.actions.stopPlayng
  const addWord = userWordsSlice.actions.addWord

  const [addLearnedWord] = userWordsAPI.useAddWordMutation()
  const [deleteLearnedWord] = userWordsAPI.useDeleteWordMutation()

  const [color, setColor] = useState('#000')
  const [learn, setLearn] = useState(false)

  const volumeSetting = settings?.wordVolume * 0.01
  const text = useRef() as MutableRefObject<HTMLElement>

  const soundAudio = new Howl({
    src: [`https://diplomabackend-production-952d.up.railway.app/${word.audio}`],
    volume: volumeSetting,
  })
  const soundAudio1 = new Howl({
    src: [`https://diplomabackend-production-952d.up.railway.app/${word.audioMeaning}`],
    volume: volumeSetting,
  })
  const soundAudio2 = new Howl({
    src: [`https://diplomabackend-production-952d.up.railway.app/${word.audioExample}`],
    volume: volumeSetting,
  })

  const addWordToLearned = async () => {
    setLearn(true)
    const res = {
      userId: user.id,
      ...word,
    }
    res.correct = 3
    delete res.id

    await addLearnedWord(res)
      .unwrap()
      .then((data) => {
        dispatch(addWord(data))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteWordFromLearned = async () => {
    setLearn(false)
    const currentWord = userWords.find((obj) => obj.word === word.word)
    if (currentWord) {
      if (currentWord.id) {
        await deleteLearnedWord(currentWord?.id)
          .then(() => console.log('word delete'))
          .catch((e) => {
            console.log(e)
          })
      }
    }
  }

  useEffect(() => {
    if (userWords.some((obj) => obj.word === word.word && obj.correct >= 3)) {
      setLearn(true)
    }
  }, [])
  return (
    <div>
      <Card sx={{ height: '500px' }}>
        <CardMedia component='img' height='140' image={`https://diplomabackend-production-952d.up.railway.app/${word.image}`} alt='green iguana' />
        {/* <div className={word.correct === 3 || learn === true ? 'learn-true' : 'learn-false'}>
          Правильно: {word.correct} <br />
          Ошибок: {word.fail}
        </div> */}
        <CardActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => {
              if (learn) {
                deleteWordFromLearned()
              } else {
                addWordToLearned()
              }
            }}
            data-name='difficult'
            data-word-name={word.word}
            id={word.id}
            value='true'
            className={'bg-true'}
          >
            {learn ? 'Удалить из изученного' : 'Изучено'}
          </button>
        </CardActions>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {word.word}/ {word.transcription}
            <Sound
              onClick={() => {
                if (!nowPlay) {
                  dispatch(startPlay())
                  soundAudio.play()
                  soundAudio.on('end', () => {
                    soundAudio1.play()
                  })
                  soundAudio1.on('end', () => {
                    soundAudio2.play()
                  })
                  soundAudio2.on('end', () => {
                    dispatch(stopPlay())
                  })
                }
              }}
              className='sound-icon'
            />
          </Typography>
          <Typography gutterBottom variant='h5' component='div' color='rgb(136, 136, 136)'>
            {settings?.translateWord === true ? word.wordTranslate : ' '}
          </Typography>
          <Typography variant='h5' color='black' ref={text}>
            {word.textMeaning.replace(/<i>|<\/i>/g, '')}
          </Typography>
          <Typography variant='h5' color='rgb(136, 136, 136)'>
            {settings?.translateSentences === true ? word.textMeaningTranslate : ' '}
          </Typography>
          <br />
          <Typography variant='h5' color='black'>
            {word.textExample.replace(/<b>|<\/b>/g, '')}
          </Typography>
          <Typography variant='h5' color='rgb(136, 136, 136)'>
            {settings?.translateSentences === true ? word.textExampleTranslate : ' '}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
