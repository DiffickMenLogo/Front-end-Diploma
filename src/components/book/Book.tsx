import React, { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { IWord } from '../../models/IWord'
import { Howl } from 'howler'
import '../../style/words.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactComponent as Sound } from '../../assets/iconmonstr-sound-thin.svg' 
import { IFullUser } from '../../models/IUser'
import { useAppSelector } from '../../hooks/redux'
import { ReactComponent as Star } from '../../assets/star2.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { useDispatch } from 'react-redux';
import { userSlice } from '../../store/reducers/UserSlice';


interface ElItemProps {
  word: IWord;
  arr: any;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  uploadWordsUser: (body: any, token: string) => void;
} 

export const Book = ({word, arr, render, setRender, uploadWordsUser}: ElItemProps) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state ) => state.userSlice) as IFullUser;
  const [difficult, setDifficult] = useState(false);
  const addWords = userSlice.actions.addUserWords;
  const [color, setColor] = useState('#000');
  const [learn, setLearn] = useState(false)
  const [button, setButton] = useState(false);
  const volumeSetting = user.settings.wordVolume * 0.01;
  const text = useRef() as MutableRefObject<HTMLElement>

  const soundAudio = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audio}`],
    volume: volumeSetting, 
  });
  const soundAudio1 = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audioMeaning}`],
    volume: volumeSetting,  
  });
  const soundAudio2 = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audioExample}`],
    volume: volumeSetting,  
  });

  const updateWord = async (event: React.MouseEvent<HTMLButtonElement>) => {
    
    // event.stopPropagation()
    setDifficult(true);
    setColor('yellow');
    const body = {
        wordId: event.currentTarget.id,
        name: event.currentTarget.dataset.name,
        value: event.currentTarget.value,
        wordName: event.currentTarget.dataset.wordName,
        wordBody: word,
    }
    if (!user.token) {
        return alert(
            'Для добавления / удаления слов необходимо авторизоваться'
        )
    }
    await uploadWordsUser(body, user.token);
    // showMessage(text, code)
  }

  const updateWordLearn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setDifficult(true);
    setLearn(true);
    setRender((prev) => !prev);
    const body = {
        wordId: event.currentTarget.id,
        name: event.currentTarget.dataset.name,
        value: event.currentTarget.value,
        wordName: event.currentTarget.dataset.wordName,
        wordBody: word = {
          ...word,
          correct: 3
        },
    }
    if (!user.token) {
        return alert(
            'Для добавления / удаления слов необходимо авторизоваться'
        )
    }
    await uploadWordsUser(body, user.token);
    // showMessage(text, code)
  }
  const updateWordDel = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setDifficult(false);
    setLearn(false);
    setRender((prev) => !prev);
    const body = {
        wordId: event.currentTarget.id,
        name: event.currentTarget.dataset.name,
        value: event.currentTarget.value,
        wordName: event.currentTarget.dataset.wordName,
        wordBody: word
    }
    if (!user.token) {
        return alert(
            'Для добавления / удаления слов необходимо авторизоваться'
        )
    }
    await uploadWordsUser(body, user.token)
  }
  if (word.word === 'alcohol') {
    console.log(word);
  }
  return (
    <div>
      <Card sx={{ height: '500px'}}>
        <CardMedia
          component="img"
          height="140"
          image={`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.image}`}
          alt="green iguana"
        />
        <div className={word.correct === 3 || learn === true ? 'learn-true' : 'learn-false'}>
            Правильно: {word.correct} <br/>
            Ошибок: {word.fail}
        </div>
        <CardActions>
          {/* {difficult ?  <button onClick={updateWord} data-name="deleted"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={`${difficult}`}>
            <Star width='40px' height='40px' ></Star>
          </button> 
              : 
            <button onClick={updateWord} data-name="difficult"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={`${difficult}`}>
            <Star width='40px' height='40px' ></Star>
          </button>} */}
          <button onClick={updateWord} data-name="difficult"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={`${difficult}`}
                                        className='star-btn'>
            <Star width='40px' height='40px' fill={word.difficult === true || word.fail === 1 || color === 'yellow' ? 'yellow' : '#000'}></Star>
          </button>
          <div>
            <button onClick={updateWordLearn} data-name="difficult"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value='true'
                                        className={word.correct === 3 || learn === true  ? 'bg-false' : 'bg-true'}>
              Изучено
            </button>
            <button onClick={updateWordDel} data-name="deleted"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value='true'
                                        className={word.correct === 3 || learn === true ? 'learn-true-btn' : 'learn-false-btn'}>
              Удалить слово из изучено
            </button>
          </div>
        </CardActions>
        <div></div>
        {/* className={word.correct === 3 || learn === true ? 'bg-card-color' : 'bg-card'} */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {word.word}/ {word.transcription}
            <Sound onClick={() => {soundAudio.play(); setTimeout(() => soundAudio1.play(), 800); setTimeout(() => soundAudio2.play(), 6000) }} className='sound-icon'/>
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color="rgb(136, 136, 136)">
          { user.settings.translateWord === true ? word.wordTranslate : ' '}
          </Typography>
          <Typography variant="h5" color="black" ref={text}>
            {word.textMeaning.replace(/<i>|<\/i>/g, '')}
          </Typography>
          <Typography variant="h5" color="rgb(136, 136, 136)">
            {user.settings.translateSentences === true ? word.textMeaningTranslate : ' '}
          </Typography>
          <br />
          <Typography variant="h5" color="black">
            {word.textExample.replace(/<b>|<\/b>/g, '')}
          </Typography>
          <Typography variant="h5" color="rgb(136, 136, 136)">
            {user.settings.translateSentences === true ? word.textExampleTranslate : ' '}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
