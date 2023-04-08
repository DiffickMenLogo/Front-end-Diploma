export interface IWord {
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
  deleted: boolean
  difficult: boolean
  correct: number
  fail: number
  learn: boolean
}

export interface IUserWord {
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
  }, 
  difficult: boolean,
	deleted: boolean,
	correct: number,
	fail: number,
}

export interface IWordState {
  words: IWord[]
  isLoading: boolean
  error: string
  page: number
  group: number
  perPage: number
  totalCount: number
}

export interface IWordGroupState {
  words: IWord[]
  isLoading: boolean
  error: string
  level: null | number
  userData: {
    userName: string
    userId: string
    avatarURL: string
    token: string
  }
  settings: {
    musicVolume: number
    soundVolume: number
    wordVolume: number
    difficultWord: boolean
    deleteWord: boolean
    translateWord: boolean
    translateSentences: boolean
    theme: string
  }
  userWords: []
  activeWords: []
  statistics: Record<string, unknown>
}

export interface IQeury {
  page: number
  group: number
  perPage: number
  totalCount: number
}
