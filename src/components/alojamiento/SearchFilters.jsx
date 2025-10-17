import React from 'react'

const SearchFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  return (
    <div className="search-filters">
      <h3>🔍 Filtros de Búsqueda</h3>
      
      <div className="filter-group">
        <label>Precio Mínimo</label>
        <input
          type="number"
          placeholder="Ej: 500"
          value={filters.precioMin}
          onChange={(e) => handleFilterChange('precioMin', e.target.value)}
          className="filter-input"
        />
      </div>
      
      <div className="filter-group">
        <label>Precio Máximo</label>
        <input
          type="number"
          placeholder="Ej: 1000"
          value={filters.precioMax}
          onChange={(e) => handleFilterChange('precioMax', e.target.value)}
          className="filter-input"
        />
      </div>
      
      <div className="filter-group">
        <label>Distancia Máxima (km)</label>
        <input
          type="number"
          step="0.1"
          placeholder="Ej: 2.0"
          value={filters.distanciaMax}
          onChange={(e) => handleFilterChange('distanciaMax', e.target.value)}
          className="filter-input"
        />
      </div>
      
      <button 
        className="btn-apply-filters"
        onClick={() => onFiltersChange(filters)}
      >
        Aplicar Filtros
      </button>
    </div>
  )
}

export default SearchFilters