import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useGetAlojamientosQuery, useGetMisPublicacionesQuery } from '../store/alojamiento/alojamientoApi'
import SearchFilters from '../components/alojamiento/SearchFilters'
import AlojamientoCard from '../components/alojamiento/AlojamientoCard'
import CreatePublicationModal from '../components/modals/CreatePublicationModal'
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [filters, setFilters] = useState({
    precioMin: '',
    precioMax: '',
    distanciaMax: '',
    orden: 'precio-asc'
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState('explorar') // 'explorar' o 'mis-publicaciones'

  const { data: alojamientos, isLoading, error } = useGetAlojamientosQuery(filters)
  const { data: misPublicaciones } = useGetMisPublicacionesQuery()

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-brand">
            <h1>🏨 UniStay</h1>
            <p>Encuentra tu hogar universitario ideal</p>
          </div>
          
          <div className="header-actions">
            <button 
              className="btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              + Publicar Alojamiento
            </button>
            
            <div className="user-menu">
              <div className="user-avatar">
                {user?.nombre?.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.nombre}</span>
                <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Sidebar - Filtros */}
        <aside className="sidebar">
          <div className="sidebar-sticky">
            <SearchFilters 
              filters={filters} 
              onFiltersChange={setFilters} 
            />
            
            {/* Sección Comunidad */}
            <div className="community-section">
              <h3>👥 Comunidad UniStay</h3>
              <div className="community-stats">
                <div className="stat">
                  <span className="stat-number">1.2k</span>
                  <span className="stat-label">Estudiantes</span>
                </div>
                <div className="stat">
                  <span className="stat-number">356</span>
                  <span className="stat-label">Alojamientos</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="content-area">
          {/* Tabs de Navegación */}
          <div className="content-tabs">
            <button 
              className={`tab-btn ${activeTab === 'explorar' ? 'active' : ''}`}
              onClick={() => setActiveTab('explorar')}
            >
              🔍 Explorar Alojamientos
            </button>
            <button 
              className={`tab-btn ${activeTab === 'mis-publicaciones' ? 'active' : ''}`}
              onClick={() => setActiveTab('mis-publicaciones')}
            >
              📝 Mis Publicaciones
            </button>
          </div>

          {/* Results Header */}
          <div className="results-header">
            <h2>
              {activeTab === 'explorar' ? 'Alojamientos Disponibles' : 'Mis Publicaciones'}
              <span className="results-count">
                ({activeTab === 'explorar' ? alojamientos?.length || 0 : misPublicaciones?.length || 0})
              </span>
            </h2>
            
            {activeTab === 'explorar' && (
              <div className="sort-options">
                <select 
                  value={filters.orden} 
                  onChange={(e) => setFilters({...filters, orden: e.target.value})}
                  className="sort-select"
                >
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                  <option value="distancia-asc">Distancia: Más Cercano</option>
                </select>
              </div>
            )}
          </div>

          {/* Alojamientos Grid */}
          {isLoading ? (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Buscando alojamientos...</p>
            </div>
          ) : error ? (
            <div className="error-section">
              <p>Error al cargar los alojamientos</p>
            </div>
          ) : (
            <div className="alojamientos-grid">
              {(activeTab === 'explorar' ? alojamientos : misPublicaciones)?.map(alojamiento => (
                <AlojamientoCard 
                  key={alojamiento.id} 
                  alojamiento={alojamiento} 
                  isOwner={activeTab === 'mis-publicaciones'}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && (activeTab === 'explorar' ? alojamientos : misPublicaciones)?.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🏠</div>
              <h3>No se encontraron alojamientos</h3>
              <p>
                {activeTab === 'explorar' 
                  ? 'Intenta ajustar los filtros para ver más resultados.' 
                  : 'Aún no has publicado ningún alojamiento.'
                }
              </p>
              {activeTab === 'mis-publicaciones' && (
                <button 
                  className="btn-primary"
                  onClick={() => setShowCreateModal(true)}
                >
                  Publicar mi primer alojamiento
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal para crear publicación */}
      {showCreateModal && (
        <CreatePublicationModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}

export default Dashboard