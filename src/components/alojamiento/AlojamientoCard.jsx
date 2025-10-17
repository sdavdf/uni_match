import React, { useState } from 'react'

const AlojamientoCard = ({ alojamiento, isOwner = false }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    // Aquí iría la lógica para guardar el like
  }

  const handleContact = () => {
    setShowContact(true)
  }

  return (
    <div className="alojamiento-card">
      {/* Header con imagen y badges */}
      <div className="card-header">
        <img 
          src={alojamiento.imagen || '/default-housing.jpg'} 
          alt={alojamiento.titulo}
          className="card-image"
        />
        <div className="card-badges">
          {isOwner && <span className="badge owner">Tu publicación</span>}
          <span className="badge type">{alojamiento.tipo}</span>
          {alojamiento.distancia && (
            <span className="badge distance">{alojamiento.distancia}km</span>
          )}
        </div>
        
        {/* Botón de like */}
        <button 
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Contenido principal */}
      <div className="card-content">
        <div className="card-price">
          <span className="price">${alojamiento.precio}</span>
          <span className="period">/mes</span>
        </div>
        
        <h3 className="card-title">{alojamiento.titulo}</h3>
        <p className="card-description">{alojamiento.descripcion}</p>
        
        {/* Características */}
        <div className="card-features">
          <div className="feature">
            <span className="feature-icon">🛏️</span>
            <span>{alojamiento.habitaciones} hab.</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚻</span>
            <span>{alojamiento.banos} baño(s)</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📏</span>
            <span>{alojamiento.metrosCuadrados}m²</span>
          </div>
        </div>

        {/* Ubicación */}
        <div className="card-location">
          <span className="location-icon">📍</span>
          <span>{alojamiento.ubicacion}</span>
        </div>

        {/* Propietario (solo en explorar) */}
        {!isOwner && alojamiento.propietario && (
          <div className="card-owner">
            <div className="owner-avatar">
              {alojamiento.propietario.nombre?.charAt(0).toUpperCase()}
            </div>
            <div className="owner-info">
              <span className="owner-name">{alojamiento.propietario.nombre}</span>
              <span className="owner-rating">⭐ 4.8</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer con acciones */}
      <div className="card-footer">
        {isOwner ? (
          <div className="owner-actions">
            <button className="btn-secondary">Editar</button>
            <button className="btn-danger">Eliminar</button>
            <div className="views">
              👁️ {alojamiento.vistas || 0} vistas
            </div>
          </div>
        ) : (
          <div className="user-actions">
            <button 
              className="btn-primary"
              onClick={handleContact}
            >
              Contactar
            </button>
            <button className="btn-secondary">
              Guardar
            </button>
          </div>
        )}
      </div>

      {/* Modal de contacto */}
      {showContact && (
        <div className="contact-modal">
          <div className="modal-content">
            <h3>Contactar a {alojamiento.propietario?.nombre}</h3>
            <p>Email: {alojamiento.propietario?.email}</p>
            <p>Teléfono: {alojamiento.propietario?.telefono}</p>
            <button 
              className="btn-primary"
              onClick={() => setShowContact(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlojamientoCard