import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Verificar si hay un token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      getUserProfile(token);
    }
  }, []);

  const getUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: token }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      logout();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // REGISTRO
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
      setFormData({ email: '', password: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Error en el registro');
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setUser(user);
      setFormData({ email: '', password: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Error en el login');
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="App">
      <h1>Sistema de Autenticación - Práctica 7</h1>
      
      {isLoggedIn ? (
        <div>
          <h2>¡Bienvenido, {user?.email}!</h2>
          <p>Has iniciado sesión correctamente.</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          {/* Formulario de Registro */}
          <div className="form-section">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Registrarse</button>
            </form>
          </div>

          {/* Formulario de Login */}
          <div className="form-section">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;