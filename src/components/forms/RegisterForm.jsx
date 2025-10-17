import React, { useState } from "react";
import { useRegisterMutation } from "../../store/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(formData).unwrap();
      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        })
      );
    } catch (err) {
      console.error("Error en registro:", err);
    }
  };

  return (
    <div>
      <h3 className="form-title">Crear Cuenta</h3>
      <p className="form-subtitle">Regístrate para comenzar</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            className="form-input"
            placeholder="Juan Pérez"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-row">
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

          <div className="form-group">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              className="form-input"
              placeholder="0999999999"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Registrarse →"}
        </button>

        {error && (
          <div className="error-message">
            {error.data?.message || "Error al crear la cuenta"}
          </div>
        )}

        <div className="form-switch">
          <p>¿Ya tienes una cuenta?</p>
          <button
            type="button"
            className="switch-link"
            onClick={() => navigate("/login")}
          >
            Inicia Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
