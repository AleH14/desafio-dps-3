const express = require('express');
const router = express.Router();
const { login, getProfile, verifyToken } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Ruta para login (POST /auth/login)
router.post('/login', login);

// Ruta para obtener perfil del usuario (GET /auth/profile) - Requiere autenticación
router.get('/profile', authenticateToken, getProfile);

// Ruta para verificar token (GET /auth/verify) - Requiere autenticación
router.get('/verify', authenticateToken, verifyToken);

module.exports = router;