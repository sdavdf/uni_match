import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const alojamientoApi = createApi({
  reducerPath: 'alojamientoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8084/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
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

    // Crear publicación
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

export const {
  useGetAlojamientosQuery,
  useGetAlojamientosFiltradosQuery,
  useGetAlojamientosOrdenadosQuery,
  useGetMisPublicacionesQuery,
  useCreateAlojamientoMutation
} = alojamientoApi