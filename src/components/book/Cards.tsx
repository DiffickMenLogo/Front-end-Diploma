import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { ReactComponent as Star } from '../../assets/star.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { ReactComponent as Sound } from '../../assets/iconmonstr-sound-thin.svg'
import { Howl } from 'howler' 
import React, { useCallback, useState } from 'react'
import { IUserWord, IWord } from '../../models/IWord'
import { useDispatch } from 'react-redux'
import { IFullUser } from '../../models/IUser'
import { useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'


interface ElItemProps {
    word: {
        _id?: string
        group: number
        page: number
        word: string
        image: string
        audio: string
        audioMeaning: string
        audioExample: string
        textMeaning: string
        transcription: string
        textExample: string
        textExampleTranslate: string
        textMeaningTranslate: string
        wordTranslate: string
      difficult: boolean,
        deleted: boolean,
        correct: number,
        fail: number,
    }
  }

export const Cards = ({word}: ElItemProps) => {
    const dispatch = useDispatch();
    const user = useAppSelector((state ) => state.userSlice) as IFullUser;
    const [difficult, setDifficult] = useState(true);
    const addWords = userSlice.actions.addUserWords;
    
    const soundAudio = new Howl({
        src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audio}`] 
      });
      const soundAudio1 = new Howl({
        src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audioMeaning}`] 
      });
      const soundAudio2 = new Howl({
        src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audioExample}`] 
      });


      const uploadWordsUser: any = useCallback(async (object: {wordId: string, name: string, value: string, wordName: string}, token: string) => {
        try{
            const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/updateWord', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(object),
            })
            const data = await res.json();
            dispatch(addWords(data.userWords))
        }catch(error){
            console.log(error);
        }
      }, []);
    
      const updateWord = async (event: React.MouseEvent<HTMLButtonElement>) => {
        
        event.stopPropagation()
        // setDifficult(false);
        const body = {
            wordId: event.currentTarget.id,
            name: event.currentTarget.dataset.name,
            value: event.currentTarget.value,
            wordName: event.currentTarget.dataset.wordName,
            wordBody: word,
        }
        if (!user.token) {
            // return console.log(
            //     'Для добавления / удаления слов необходимо авторизоваться'
            // )
        }
        const { text, code } = await dispatch(uploadWordsUser(body, user.token))
        // showMessage(text, code)
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
        <CardActions>
          <Button size="small" onClick={updateWord} data-name="deleted"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={`${difficult}`}>
            <Delete width='40px' height='40px' className={user.settings.deleteWord ? 'btn-difficult' : 'btn-difficult-block'} ></Delete>
          </Button>
        </CardActions>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {word.word}/ {word.transcription} / {word.group} / {word.page} / {word.fail}
            <Sound onClick={() => {soundAudio.play(); setTimeout(() => soundAudio1.play(), 800); setTimeout(() => soundAudio2.play(), 6000) }} className='sound-icon'/>
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color="rgb(136, 136, 136)">
            {word.wordTranslate}
          </Typography>
          <Typography variant="h5" color="black">
            {word.textMeaning}
          </Typography>
          <Typography variant="h5" color="rgb(136, 136, 136)">
            {word.textMeaningTranslate}
          </Typography>
          <br />
          <Typography variant="h5" color="black">
            {word.textExample}
          </Typography>
          <Typography variant="h5" color="rgb(136, 136, 136)">
            {word.textExampleTranslate}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
