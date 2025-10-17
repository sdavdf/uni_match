// components/layout/AuthLayout.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({ currentForm, children }) => {
  const navigate = useNavigate()

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-content">
          <div className="auth-card">
            <div className="auth-header">
              <h1>🏨 UniMatch</h1>
              <p>Encuentra tu hogar lejos de casa</p>
            </div>
            
            <div className="form-selector">
              <button 
                className={`selector-btn ${currentForm === 'login' ? 'active' : ''}`}
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </button>
              <button 
                className={`selector-btn ${currentForm === 'register' ? 'active' : ''}`}
                onClick={() => navigate('/register')}
              >
                Crear Cuenta
              </button>
            </div>
            
            <div className="form-wrapper">
              <div className="form-container">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout