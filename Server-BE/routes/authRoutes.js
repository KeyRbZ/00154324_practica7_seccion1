const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Usuario de ejemplo (en producción usarías una base de datos)
let users = [];

// REGISTRO de usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    
    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword
    };
    
    users.push(user);
    
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// LOGIN de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    
    // Verificar password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    
    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      'secreto_super_seguro', 
      { expiresIn: '1h' }
    );
    
    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta PROTEGIDA (ejemplo)
router.get('/profile', verifyToken, (req, res) => {
  res.json({ 
    message: 'Información protegida', 
    user: req.user 
  });
});

module.exports = router;