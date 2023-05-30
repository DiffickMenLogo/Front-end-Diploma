import { IQeury, IUpdateUserWord, IUserWord, IWord } from '../models/IWord'
import { useAppSelector } from './../hooks/redux'
import {
  IUserResponse,
  IStatistics,
  ISettingsValue,
  IAuthResponse,
  IAuthError,
  IAuthResponseOrError,
  IUserIdResponse,
  ISettings,
  IUser,
  IChangeNameUser,
  IStatisticsRequest,
} from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

//  https://diplomabackend-production.up.railway.app
// https://diplomabackend-production-fe5e.up.railway.app
// https://diplomabackend-production-952d.up.railway.app
const urlIlya = 'https://diplomabackend-production-952d.up.railway.app'

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: urlIlya }),
  endpoints: (builder) => ({
    getWords: builder.query<IWord[], object>({
      query: ({ page, group }: IQeury) => ({
        url: '/words',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          page: page,
          group: group,
        },
      }),
    }),
    gerUserId: builder.query<IUserIdResponse, any>({
      query: () => ({
        url: '',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
  }),
})

export const registrationAPI = createApi({
  reducerPath: 'registrationAPI',
  baseQuery: fetchBaseQuery({ baseUrl: urlIlya }),
  endpoints: (builder) => ({
    login: builder.mutation<IAuthResponseOrError, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/auth/signin',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation<IUserResponse, { name?: string; email: string; password: string }>({
      query: ({ email, password, name }) => ({
        url: '/auth/signup',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { email, password, name },
      }),
    }),
    refresh: builder.mutation<IAuthResponseOrError, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: '/auth/refresh',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
})

export const userWordsAPI = createApi({
  reducerPath: 'userWordsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: urlIlya }),
  endpoints: (builder) => ({
    addWord: builder.mutation<IWord, IWord>({
      query: (word) => ({
        url: '/userWords',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'POST',
        body: word,
      }),
    }),
    putWord: builder.mutation<IUpdateUserWord, IWord>({
      query: (word) => ({
        url: '/userWords',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'PUT',
        body: word,
      }),
    }),
    deleteWord: builder.mutation<IWord, string>({
      query: (id) => ({
        url: '/userWords',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'DELETE',
        params: {
          id,
        },
      }),
    }),
    getUserWords: builder.query<IWord[], string>({
      query: (id: string) => ({
        url: '/userWords',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'GET',
        params: {
          id,
        },
      }),
    }),
  }),
})

export const statsAPI = createApi({
  reducerPath: 'statsApt',
  baseQuery: fetchBaseQuery({ baseUrl: urlIlya }),
  endpoints: (builder) => ({
    getStats: builder.query<IStatistics[], string>({
      query: (id: string) => ({
        url: '/statistics',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          id,
        },
      }),
    }),
    postStats: builder.mutation<IStatisticsRequest, IStatisticsRequest>({
      query: ({ userId, gameName, totalWords, correctPercent, longestSeries, date }) => ({
        url: '/statistics',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'POST',
        body: {
          userId,
          gameName,
          totalWords,
          correctPercent,
          date,
          longestSeries,
        },
      }),
    }),
  }),
})

export const settingsAPI = createApi({
  reducerPath: 'settingsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: urlIlya }),
  endpoints: (builder) => ({
    getSettings: builder.query<ISettings, string>({
      query: (id: string) => ({
        url: '/settings',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          id,
        },
      }),
    }),
    updateSettings: builder.mutation<ISettings, ISettings>({
      query: ({ soundVolume, musicVolume, wordVolume, difficultWord, deleteWord, translateSentences, translateWord, theme }: ISettings) => ({
        url: '/settings',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'PUT',
        body: {
          soundVolume,
          musicVolume,
          wordVolume,
          difficultWord,
          deleteWord,
          translateSentences,
          translateWord,
          theme,
        },
      }),
    }),
  }),
})

export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: urlIlya }),
  endpoints: (builder) => ({
    changeName: builder.mutation<IUser, IChangeNameUser>({
      query: ({ name, id }) => ({
        url: '/user',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'PUT',
        body: {
          name,
          id,
        },
      }),
    }),
  }),
})
