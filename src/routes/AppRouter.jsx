// AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/ui/AuthLayout";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import Dashboard from "../pages/DashboardPage";

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Ruta Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? 
          <Navigate to="/dashboard" replace /> : 
          <AuthLayout currentForm="login">
            <LoginForm />
          </AuthLayout>
        }
      />

      {/* Ruta Register */}
      <Route
        path="/register"
        element={
          isAuthenticated ? 
          <Navigate to="/dashboard" replace /> : 
          <AuthLayout currentForm="register">
            <RegisterForm />
          </AuthLayout>
        }
      />

      {/* Ruta Dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? 
          <Dashboard /> : 
          <Navigate to="/login" replace />
        }
      />

      {/* Redirecciones por defecto */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}