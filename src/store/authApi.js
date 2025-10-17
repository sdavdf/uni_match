// store/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8084/api/auth/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      // Opcional: agregar token si existe
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // REGISTER
    register: builder.mutation({
      query: (userData) => ({
        url: 'registro',
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['User']
    }),
    
    // LOGIN
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['User']
    })
  })
})

export const { useRegisterMutation, useLoginMutation } = authApi