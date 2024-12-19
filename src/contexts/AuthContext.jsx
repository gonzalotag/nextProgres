// src/app/Contexts/AuthContext.jsx
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const user = localStorage.getItem('userEmail');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email) => {
    localStorage.setItem('userEmail', email); // Guarda el email en localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
