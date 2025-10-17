import React, { useState } from 'react'
import { useCreateAlojamientoMutation } from '../../store/alojamiento/alojamientoApi'

const CreatePublicationModal = ({ onClose }) => {
  const [createAlojamiento, { isLoading }] = useCreateAlojamientoMutation()
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    tipo: 'Departamento',
    habitaciones: '',
    banos: '',
    metrosCuadrados: '',
    ubicacion: '',
    distancia: '',
    imagen: ''
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
      await createAlojamiento(formData).unwrap()
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
            <div className="form-group">
              <label>Título de la publicación *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ej: Acogedor departamento cerca de la universidad"
                required
              />
            </div>

            <div className="form-group">
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

            <div className="form-group">
              <label>Precio mensual ($) *</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="500"
                required
              />
            </div>

            <div className="form-group">
              <label>Tipo de alojamiento *</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value="Departamento">Departamento</option>
                <option value="Casa">Casa</option>
                <option value="Habitación">Habitación</option>
                <option value="Estudio">Estudio</option>
                <option value="Loft">Loft</option>
              </select>
            </div>

            <div className="form-group">
              <label>Habitaciones *</label>
              <input
                type="number"
                name="habitaciones"
                value={formData.habitaciones}
                onChange={handleChange}
                placeholder="2"
                required
              />
            </div>

            <div className="form-group">
              <label>Baños *</label>
              <input
                type="number"
                name="banos"
                value={formData.banos}
                onChange={handleChange}
                placeholder="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Metros cuadrados *</label>
              <input
                type="number"
                name="metrosCuadrados"
                value={formData.metrosCuadrados}
                onChange={handleChange}
                placeholder="60"
                required
              />
            </div>

            <div className="form-group">
              <label>Ubicación *</label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Ej: Av. Principal #123, Ciudad Universitaria"
                required
              />
            </div>

            <div className="form-group">
              <label>Distancia a universidad (km)</label>
              <input
                type="number"
                step="0.1"
                name="distancia"
                value={formData.distancia}
                onChange={handleChange}
                placeholder="1.5"
              />
            </div>

            <div className="form-group full-width">
              <label>URL de la imagen</label>
              <input
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
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