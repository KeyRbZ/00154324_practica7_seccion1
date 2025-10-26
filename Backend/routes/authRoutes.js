const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();


let users = [];


router.post('/signin', async (req, res) => {
  try {
    const { email, password, action } = req.body;
    
    // REGISTRO
    if (action === 'register') {
      // Verificar si el usuario ya existe
      const userExists = users.find(user => user.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
      
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Crear usuario
      const user = {
        id: Date.now().toString(),
        email,
        password: hashedPassword
      };
      
      users.push(user);
      
      return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    }
    
    // LOGIN
    else if (action === 'login') {
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
      
      return res.json({
        message: 'Login exitoso',
        token,
        user: { id: user.id, email: user.email }
      });
    }
    
    else {
      return res.status(400).json({ message: 'Acción no válida. Use "register" o "login"' });
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta PROTEGIDA
router.get('/protected', verifyToken, (req, res) => {
  res.json({ 
    message: 'Información protegida', 
    user: req.user 
  });
});

module.exports = router;