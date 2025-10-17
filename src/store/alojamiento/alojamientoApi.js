// store/alojamiento/alojamientoApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8084/api/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  
  if (result.error && result.error.status === 401) {
    console.log('Token expired, redirecting to login...')
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  
  return result
}

export const alojamientoApi = createApi({
  reducerPath: 'alojamientoApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Alojamiento'],
  endpoints: (builder) => ({
    // 1. Ver todos los alojamientos
    getAlojamientos: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams()
        Object.keys(filters).forEach(key => {
          if (filters[key]) params.append(key, filters[key])
        })
        return `alojamientos?${params.toString()}`
      },
      providesTags: ['Alojamiento']
    }),

    // 2. Buscar por filtros
    getAlojamientosFiltrados: builder.query({
      query: ({ precioMin, precioMax, distanciaMax }) => 
        `alojamientos/filtros?precioMin=${precioMin}&precioMax=${precioMax}&distanciaMax=${distanciaMax}`,
      providesTags: ['Alojamiento']
    }),

    // 3. Ordenar resultados
    getAlojamientosOrdenados: builder.query({
      query: (orden) => `alojamientos/ordenar/${orden}`,
      providesTags: ['Alojamiento']
    }),

    // 4. Ver mis publicaciones
    getMisPublicaciones: builder.query({
      query: () => 'alojamientos/mis-publicaciones',
      providesTags: ['Alojamiento']
    }),

    // 5. Crear publicación - ¡ESTE ES EL QUE FALTA!
    createAlojamiento: builder.mutation({
      query: (alojamientoData) => ({
        url: 'alojamientos',
        method: 'POST',
        body: alojamientoData
      }),
      invalidatesTags: ['Alojamiento']
    })
  })
})

// ✅ Asegúrate de exportar TODOS los hooks
export const {
  useGetAlojamientosQuery,
  useGetAlojamientosFiltradosQuery,
  useGetAlojamientosOrdenadosQuery,
  useGetMisPublicacionesQuery,
  useCreateAlojamientoMutation  // ← Esta debe estar incluida
} = alojamientoApi