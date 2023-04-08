import { IUserWord } from './IWord'

export interface IUser {
  name: string
  email: string
  password: string
  avatarURL: string
  token: string
  error?: {
    data: {
      message: string
    }
  }
  settings: {
    soundVolume: number
    musicVolume: number
    wordVolume: number
    difficultWord: boolean
    deleteWord: boolean
    translateWord: boolean
    transleteSentences: boolean
    theme: string
  }
  statistics: {
    gameName: string
    totalWords: number
    correctPercent: number
    longestSeries: number
    date: string
  }
  data: {
    name: string
    email: string
    password: string
    avatarURL: string
    token: string
    message: string
    error?: {
      data: {
        message: string
      }
    }
    settings: {
      soundVolume: number
      musicVolume: number
      wordVolume: number
      difficultWord: boolean
      deleteWord: boolean
      translateWord: boolean
      transleteSentences: boolean
      theme: string
    }
    statistics: {
      gameName: string
      totalWords: number
      correctPercent: number
      longestSeries: number
      date: string
    }
  }
}

export interface IAuth {
  isAuth: boolean
}

export interface IStatistics {
  userWords: [
    {
      group: { type: number }
      page: { type: number }
      word: { type: string }
      wordTranslate: { type: string }
      transcription: { type: string }
      image: { type: string }
      audio: { type: string }
      audioMeaning: { type: string }
      audioExample: { type: string }
      textMeaning: { type: string }
      textMeaningTranslate: { type: string }
      textExample: { type: string }
      textExampleTranslate: { type: string }
      difficult: { type: boolean; default: false }
      deleted: { type: boolean; default: false }
      correct: { type: number; default: 0 }
      fail: { type: number; default: 0 }
    },
  ]
  statistics: {
    gameName: string
    totalWords: number
    correctPercent: number
    longestSeries: number
    date: string
  }
  message: string
}

export interface ISettings {
  settings: {
    soundVolume: number | number[]
    musicVolume: number | number[]
    wordVolume: number | number[]
    difficultWord: boolean
    deleteWord: boolean
    translateWord: boolean
    translateSentences: boolean
    theme: string
  }
}

export interface ISettingsValue {
  settingValue: number | boolean
}

export interface IFullUser {
  token: string
  userId: string
  userName: string
  userEmail: string
  avatarURL: string
  settings: {
    soundVolume: number
    musicVolume: number
    wordVolume: number
    difficultWord: boolean
    deleteWord: boolean
    translateWord: boolean
    translateSentences: boolean
    theme: string
  }
  userWords: IUserWord[]
  statistics: {
    todayDate: string
    learnedWordsTotal: number
    learnedWordsToday: number
    learnedWordsPerDate: Array<string>
    percentToday: string
    games: Array<{
      name: string
      longestSeries: number
      correctPercent: number
      wordsCount: number
    }>
  }
  message: string
}

export interface IResponse {
  data: IFullUser
  error: {
    data: {
      message: string
    }
  }
}

export interface IUserStatistics {
  todayDate: string
  learnedWordsTotal: Array<{ date: string; words: number }>
  learnedWordsToday: number
  learnedWordsPerDate: Array<string>
  percentToday: string
  games: Array<{
    name: string
    longestSeries: number
    correctPercent: number
    wordsCount: number
  }>
}
