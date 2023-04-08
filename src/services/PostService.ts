import { IQeury, IWord } from '../models/IWord'
import { useAppSelector } from './../hooks/redux'
import { IUser, IStatistics, ISettingsValue } from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'


export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com/' }),
  endpoints: (builder) => ({
    getWords: builder.query<IWord[], object>({
      query: ({ page, group }: IQeury) => ({
        url: '/allWords',
        params: {
          page: page,
          group: group,
        },
      }),
    }),
  }),
})

export const registrationAPI = createApi({
  reducerPath: 'registrationAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com' }),
  endpoints: (builder) => ({
    login: builder.mutation<IUser, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/signin',
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation<IUser, { name?: string; email: string; password: string }>({
      query: ({ email, password, name }) => ({
        url: '/signup',
        method: 'POST',
        body: { email, password, name },
      }),
    }),
  }),
})
