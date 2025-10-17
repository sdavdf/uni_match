// components/forms/LoginForm.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../store/authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../store/authSlice'

const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await login(formData).unwrap()
      console.log('Login response:', response)
      
      // ✅ CORRECCIÓN: Usar 'usuario' en lugar de 'user'
      if (response.usuario && response.token) {
        dispatch(setCredentials({
          user: response.usuario,  // ← Cambiado de response.user a response.usuario
          token: response.token
        }))
        navigate('/dashboard')
      } else {
        console.error('Respuesta del login incompleta:', response)
      }
    } catch (err) {
      console.error('Error en login:', err)
    }
  }

  return (
    <div>
      <h3 className="form-title">Iniciar Sesión</h3>
      <p className="form-subtitle">Bienvenido de vuelta</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión →'}
        </button>

        {error && (
          <div className="error-message">
            {error.data?.message || 'Error al iniciar sesión'}
          </div>
        )}

        <div className="form-switch">
          <p>¿No tienes una cuenta?</p>
          <button 
            type="button" 
            className="switch-link" 
            onClick={() => navigate('/register')}
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm