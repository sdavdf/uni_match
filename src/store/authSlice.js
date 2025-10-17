// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Función para obtener el estado inicial de forma segura
const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      isAuthenticated: false
    }
  }
  
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  
  let user = null
  try {
    user = userStr ? JSON.parse(userStr) : null
  } catch (error) {
    console.error('Error parsing user from localStorage:', error)
    localStorage.removeItem('user')
  }
  
  return {
    user: user,
    token: token,
    isAuthenticated: !!token
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    // Establecer credenciales después de login/registro
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    
    // Cerrar sesión (logout)
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },
    
    // Actualizar información del usuario
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    
    // Clear credentials (si la necesitas)
    clearCredentials: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }
})

// Exportar TODAS las acciones
export const { 
  setCredentials, 
  logout, 
  updateUser, 
  clearCredentials 
} = authSlice.actions

export default authSlice.reducer