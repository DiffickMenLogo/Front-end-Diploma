import { IUserWord } from './IWord'

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
  avatarURL: string
  name: string
  id: string
}

export interface IAuthError {
  data: {
    error: string
    message: string
    statusCode: number
  }
  status: number
}
export interface IAuthResponseOrError {
  data?: IAuthResponse
  error?: IAuthError
}
export interface ISettings {
  userId: string
  soundVolume: number
  musicVolume: number
  wordVolume: number
  difficultWord: boolean
  deleteWord: boolean
  translateWord: boolean
  translateSentences: boolean
  theme: string
}

export interface IStatistics {
  gameName: string
  totalWords: number
  correctPercent: number
  longestSeries: number
  date: string
}

export interface IUserIdResponse {
  sub: string
  email: string
  iat: number
  exp: number
}

export interface IUserResponse {
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
  }
}

export interface IUser {
  name: string
  email: string
  avatarURL: string
  id: string
}

export interface IAuth {
  isAuth: boolean
}

export interface IUserSet {
  name: string
  email: string
  avatarURL: string
  id: string
}

export interface IChangeNameUser {
  name: string
  id: string
}

export interface IStatistics {
  gameName: string
  totalWords: number
  correctPercent: number
  longestSeries: number
  date: string
}

export interface IStatisticsRequest {
  userId: string
  gameName: string
  totalWords: number
  correctPercent: number
  longestSeries: number
  date: string
}

export interface ISettings {
  soundVolume: number
  musicVolume: number
  wordVolume: number
  difficultWord: boolean
  deleteWord: boolean
  translateWord: boolean
  translateSentences: boolean
  theme: string
}

export interface ISettingsValue {
  settingValue: number | boolean
}
export interface IUserStatistics {
  userId: string
  todayDate: string
  learnedWordsTotal: number
  learnedWordsToday: number
  learnedWordsPerDate: Array<{ date: string; words: number }>
  percentToday: string
  games: Array<{
    gameName: string
    totalWords: number
    correctPercent: number
    longestSeries: number
    date: string
  }>
}
