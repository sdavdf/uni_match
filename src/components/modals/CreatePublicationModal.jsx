import React, { useState } from 'react'
import { useCreateAlojamientoMutation } from '../../store/alojamiento/alojamientoApi'

const CreatePublicationModal = ({ onClose }) => {
  const [createAlojamiento, { isLoading }] = useCreateAlojamientoMutation()
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    distancia: '',
    habitaciones: '',
    disponibilidad: 'Disponible',
    calificacion: '',
    direccion: '',
    longitud: '',
    fotos: [''],
    caracteristicas: []
  })

  const [nuevaFoto, setNuevaFoto] = useState('')
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const agregarFoto = () => {
    if (nuevaFoto.trim()) {
      setFormData({
        ...formData,
        fotos: [...formData.fotos, nuevaFoto.trim()]
      })
      setNuevaFoto('')
    }
  }

  const eliminarFoto = (index) => {
    const nuevasFotos = formData.fotos.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      fotos: nuevasFotos
    })
  }

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim()) {
      setFormData({
        ...formData,
        caracteristicas: [...formData.caracteristicas, nuevaCaracteristica.trim()]
      })
      setNuevaCaracteristica('')
    }
  }

  const eliminarCaracteristica = (index) => {
    const nuevasCaracteristicas = formData.caracteristicas.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      caracteristicas: nuevasCaracteristicas
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Preparar datos para enviar
    const datosEnvio = {
      ...formData,
      precio: parseFloat(formData.precio),
      distancia: parseFloat(formData.distancia),
      habitaciones: parseInt(formData.habitaciones),
      calificacion: formData.calificacion ? parseFloat(formData.calificacion) : 0,
      fotos: formData.fotos.filter(foto => foto.trim() !== ''),
      caracteristicas: formData.caracteristicas
    }

    console.log('Datos a enviar:', datosEnvio)

    try {
      await createAlojamiento(datosEnvio).unwrap()
      onClose()
    } catch (error) {
      console.error('Error creando publicación:', error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>🏠 Publicar Alojamiento</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="publication-form">
          <div className="form-grid">
            {/* Nombre */}
            <div className="form-group">
              <label>Nombre del alojamiento *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Departamento céntrico cerca de la universidad"
                required
              />
            </div>

            {/* Descripción */}
            <div className="form-group full-width">
              <label>Descripción *</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe tu alojamiento, servicios incluidos, reglas, etc."
                rows="4"
                required
              />
            </div>

            {/* Precio */}
            <div className="form-group">
              <label>Precio mensual ($) *</label>
              <input
                type="number"
                step="0.01"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="100.00"
                required
              />
            </div>

            {/* Distancia */}
            <div className="form-group">
              <label>Distancia a universidad (km) *</label>
              <input
                type="number"
                step="0.1"
                name="distancia"
                value={formData.distancia}
                onChange={handleChange}
                placeholder="1.5"
                required
              />
            </div>

            {/* Habitaciones */}
            <div className="form-group">
              <label>Habitaciones *</label>
              <input
                type="number"
                name="habitaciones"
                value={formData.habitaciones}
                onChange={handleChange}
                placeholder="1"
                required
              />
            </div>

            {/* Disponibilidad */}
            <div className="form-group">
              <label>Disponibilidad *</label>
              <select
                name="disponibilidad"
                value={formData.disponibilidad}
                onChange={handleChange}
                required
              >
                <option value="Disponible">Disponible</option>
                <option value="Ocupado">Ocupado</option>
                <option value="Próximamente">Próximamente</option>
              </select>
            </div>

            {/* Calificación */}
            <div className="form-group">
              <label>Calificación (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="calificacion"
                value={formData.calificacion}
                onChange={handleChange}
                placeholder="4.5"
              />
            </div>

            {/* Dirección */}
            <div className="form-group full-width">
              <label>Dirección completa *</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Ej: Av. Principal #123, Ciudad Universitaria"
                required
              />
            </div>

            {/* Longitud */}
            <div className="form-group">
              <label>Longitud (coordenada)</label>
              <input
                type="text"
                name="longitud"
                value={formData.longitud}
                onChange={handleChange}
                placeholder="-77.028240"
              />
            </div>

            {/* Fotos */}
            <div className="form-group full-width">
              <label>Fotos</label>
              <div className="array-input">
                <div className="input-with-button">
                  <input
                    type="text"
                    value={nuevaFoto}
                    onChange={(e) => setNuevaFoto(e.target.value)}
                    placeholder="URL de la foto"
                    className="array-input-field"
                  />
                  <button 
                    type="button" 
                    onClick={agregarFoto}
                    className="btn-add"
                  >
                    +
                  </button>
                </div>
                <div className="array-items">
                  {formData.fotos.map((foto, index) => (
                    foto && (
                      <div key={index} className="array-item">
                        <span>{foto}</span>
                        <button 
                          type="button" 
                          onClick={() => eliminarFoto(index)}
                          className="btn-remove"
                        >
                          ×
                        </button>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Características */}
            <div className="form-group full-width">
              <label>Características</label>
              <div className="array-input">
                <div className="input-with-button">
                  <input
                    type="text"
                    value={nuevaCaracteristica}
                    onChange={(e) => setNuevaCaracteristica(e.target.value)}
                    placeholder="Ej: Wifi, Cocina, Aire acondicionado"
                    className="array-input-field"
                  />
                  <button 
                    type="button" 
                    onClick={agregarCaracteristica}
                    className="btn-add"
                  >
                    +
                  </button>
                </div>
                <div className="array-items">
                  {formData.caracteristicas.map((caracteristica, index) => (
                    <div key={index} className="array-item">
                      <span>{caracteristica}</span>
                      <button 
                        type="button" 
                        onClick={() => eliminarCaracteristica(index)}
                        className="btn-remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Publicando...' : 'Publicar Alojamiento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePublicationModal