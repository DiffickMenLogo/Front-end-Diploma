import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import '../../style/AudioChallenge.scss'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { IWord } from '../../models/IWord'
import { levelSlice } from '../../store/reducers/WordGroupSlice'
import FailSound from '../../assets/sound/fail.mp3'
import SuccessSound from '../../assets/sound/success.mp3'
import { createSound, toggleScreen } from './Sprint'
import { GameResult } from './GameResult'
import { Box, CircularProgress, LinearProgress } from '@mui/material'
import { LifesInGame } from './LifesInGames'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Link } from 'react-router-dom'

const initialObject = {} as IWord
const initialArray = [] as HTMLButtonElement[]

const keyCode = {
  num1: 'Numpad1',
  num2: 'Numpad2',
  num3: 'Numpad3',
  num4: 'Numpad4',
}

export const AudioChallenge = () => {
  const { soundVolume, wordVolume } = useAppSelector((state) => state.userSlice.settings)
  const { words, isLoading } = useAppSelector((state) => state.levelSlice)
  const { setLevel, setActiveWords } = levelSlice.actions
  const dispatch = useAppDispatch()

  const [endGame, setEndGame] = useState<boolean>(false)
  const [wordsArray, setWordsArray] = useState<IWord[]>([])
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([])
  const [failAnswers, setFailAnswers] = useState<IWord[]>([])
  const [currentWord, setCurrentWord] = useState(initialObject)
  const [currentNumber, setCurrentNumber] = useState<number>(0)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [currentSeries, setCurrentSeries] = useState<number>(0)
  const [allSeries, setAllSeries] = useState<number[]>([])
  const [lifes, setLifes] = useState<number>(5)
  const [fourWords, setFourWords] = useState<IWord[]>([])
  const [block, setBlock] = useState<boolean>(true)

  const four = useRef(initialArray) as MutableRefObject<HTMLButtonElement[]>
  const gameBoard = useRef() as MutableRefObject<HTMLDivElement>
  const seriesContainer = useRef() as MutableRefObject<HTMLDivElement>

  const audioSuccess = useMemo(() => createSound(SuccessSound, soundVolume), [soundVolume])
  const audioFail = useMemo(() => createSound(FailSound, soundVolume), [soundVolume])
  const audioWord = useMemo(
    () => createSound(`https://rs-lang-back-diffickmenlogo.herokuapp.com/${currentWord.audio}`, wordVolume),
    [wordVolume, currentWord],
  )

  const playWords = useCallback(async () => {
    setWordsArray(words)
    Howler.mute(false)
    setTimeout(() => {
      setBlock(false)
    }, 200)
  }, [words])

  useEffect(() => {
    playWords()
  }, [playWords])

  const answer = useCallback(
    (word: string) => {
      console.log(word)
      if (block || !word || endGame) return
      if (word === currentWord.word) {
        setCorrectAnswers((prev) => [...prev, currentWord])
        seriesContainer.current.innerHTML += ' <img src="https://img.icons8.com/emoji/452/star-emoji.png"/>'
        setCurrentSeries((prev) => prev + 1)
        const correctButton = four.current.find((button) => button.value === word)
        correctButton!.className = 'game-audio__btn-correct'
        setBlock(true)
        setTimeout(() => {
          correctButton!.className = 'game-audio__btn'
          setCurrentNumber((prev) => prev + 1)
          setBlock(false)
        }, 2000)
        Howler.stop()
        audioSuccess.play()
      } else {
        setFailAnswers((prev) => [...prev, currentWord])
        setAllSeries((prev) => [...prev, currentSeries])
        setCurrentSeries(0)
        seriesContainer.current.innerHTML = ''
        const correctButton = four.current.find((button) => button.value === currentWord.word)
        const failButton = four.current.find((button) => button.value === word)
        correctButton!.className = 'game-audio__btn-correct'
        failButton!.className = 'game-audio__btn-fail'
        setBlock(true)
        setTimeout(() => {
          correctButton!.className = 'game-audio__btn'
          failButton!.className = 'game-audio__btn'
          setCurrentNumber((prev) => prev + 1)
          setBlock(false)
        }, 2000)
        Howler.stop()
        audioFail.play()
        setLifes((prev) => prev - 1)
      }
    },
    [block, endGame, currentWord, audioSuccess, audioFail, currentSeries],
  )

  useEffect(() => {
    if ((currentNumber && currentNumber >= wordsArray.length) || !lifes) {
      setBlock(true)
      setTimeout(() => {
        setEndGame(true)
      }, 2000)
    }
  }, [wordsArray, currentNumber, lifes, correctAnswers, allSeries, failAnswers])

  useEffect(() => {
    if (wordsArray.length && currentNumber < wordsArray.length) {
      setCurrentWord(wordsArray[currentNumber])
    }
  }, [currentNumber, wordsArray])

  useEffect(() => {
    if (endGame) return
    if (currentWord && !block) {
      Howler.stop()
      setTimeout(() => {
        if (lifes === 0) {
          Howler.stop()
        } else {
          Howler.stop()
          audioWord.play()
        }
      }, 200)
    }
    return () => {
      clearTimeout()
    }
  }, [currentWord, audioWord, block, endGame])

  useEffect(() => {
    if (wordsArray.length && currentNumber < wordsArray.length) {
      const arr = wordsArray.filter((word) => word.word !== currentWord.word).sort((a, b) => Math.random() - 0.5)
      arr.unshift(currentWord)
      const fourArr = arr.slice(0, 4)
      fourArr.sort((a, b) => Math.random() - 0.5)
      setFourWords(fourArr)
    }
  }, [currentWord, wordsArray, currentNumber])

  useEffect(() => {
    if (endGame) return
    const keyboardClick = (evt: KeyboardEvent) => {
      if (!Object.values(keyCode).includes(evt.code)) return
      let elem = ''
      if (evt.code === keyCode.num1) {
        elem = four.current[0].value
      } else if (evt.code === keyCode.num2) {
        elem = four.current[1].value
      } else if (evt.code === keyCode.num3) {
        elem = four.current[2].value
      } else if (evt.code === keyCode.num4) {
        elem = four.current[3].value
      }

      answer(elem)
    }
    document.addEventListener('keydown', keyboardClick)
    return () => {
      document.removeEventListener('keydown', keyboardClick)
    }
  }, [answer, endGame])

  useEffect(() => {
    return () => {
      dispatch(setLevel(null))
      dispatch(setActiveWords([]))
    }
  }, [dispatch])

  function repeatSound() {
    Howler.stop()
    audioWord.play()
  }

  const setFourRef = (element: HTMLButtonElement, index: number) => {
    if (!element) return
    four.current[index] = element
  }

  function goFullScreen(elem: HTMLDivElement) {
    setFullScreen((prev) => !prev)
    toggleScreen(elem)
  }

  return (
    <div className='game-audio__container'>
      {isLoading ? (
        <CircularProgress className='game-audio__loader' />
      ) : endGame ? (
        <GameResult allSeries={allSeries} gameName='audio' correctAnswers={correctAnswers} failAnswers={failAnswers} />
      ) : (
        <div ref={gameBoard} className='game-audio__board'>
          <LinearProgress
            variant='determinate'
            value={(currentNumber / wordsArray.length) * 100}
            sx={{
              backgroundColor: '#fff',
              '& .MuiLinearProgress-bar': { backgroundColor: '#360570' },
              height: '1rem',
              borderRadius: '4px',
              width: '80%',
            }}
          />

          {fullScreen ? (
            <FullscreenExitIcon className='game-audio__btn-fullscreen' onClick={() => goFullScreen(gameBoard.current)} />
          ) : (
            <FullscreenIcon className='game-audio__btn-fullscreen' onClick={() => goFullScreen(gameBoard.current)} />
          )}
          <Link to='/games'>
            <ArrowBackIosNewIcon className='game-audio__btn-back' />
          </Link>
          <LifesInGame lifes={lifes} />
          <Box className='game-audio__sound-container'>
            {block ? (
              <img src={`https://rs-lang-back-diffickmenlogo.herokuapp.com/${currentWord.image}`} />
            ) : (
              <KeyboardVoiceIcon className='game-audio__btn-repeat' onClick={repeatSound} />
            )}
          </Box>
          <div ref={seriesContainer} className='game-audio__series-container' />
          <div className='game-audio__btn-container'>
            {fourWords.map((wordVariant, index) => {
              return (
                <button
                  key={wordVariant._id + wordVariant.word}
                  ref={(element: HTMLButtonElement) => setFourRef(element, index)}
                  onClick={(btn) => answer(btn.currentTarget.value)}
                  value={wordVariant.word}
                  className='game-audio__btn'
                  disabled={block}
                >
                  {wordVariant.wordTranslate}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
