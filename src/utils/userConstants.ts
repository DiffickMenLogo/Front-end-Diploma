import { ISettings, IUser, IStatistics } from '../models/IUser'

export const emptyUser: IUser = {
  id: '',
  name: '',
  email: '',
  avatarURL: '',
}

export const emptySettings: ISettings = {
  userId: '',
  soundVolume: 0,
  musicVolume: 0,
  wordVolume: 50,
  difficultWord: true,
  deleteWord: true,
  translateWord: true,
  translateSentences: true,
  theme: 'dark',
}

export const emptyStats: IStatistics = {
  gameName: '',
  totalWords: 0,
  correctPercent: 0,
  longestSeries: 0,
  date: '',
}
