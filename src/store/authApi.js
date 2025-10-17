// store/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8084/api/auth/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  }
})

// Base query con reautenticación
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  
  if (result.error && result.error.status === 401) {
    // Token expirado - hacer logout
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  
  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
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

// ✅ Asegúrate de que estas exportaciones existan
export const { 
  useRegisterMutation, 
  useLoginMutation 
} = authApi