const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userModel');

// Cargar variables de entorno
require('dotenv').config();

// Obtener configuración de JWT desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '24h';

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Encabezado de autorización requerido',
        error: 'MISSING_AUTH_HEADER',
        hint: 'Incluye el encabezado Authorization: Bearer <token>'
      });
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso requerido',
        error: 'MISSING_TOKEN',
        hint: 'Formato esperado: Authorization: Bearer <token>',
        received: authHeader
      });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        let errorMessage = 'Token inválido';
        let errorCode = 'INVALID_TOKEN';
        let hint = 'Verifica que el token sea correcto y no haya expirado';

        if (err.name === 'TokenExpiredError') {
          errorMessage = 'Token expirado';
          errorCode = 'TOKEN_EXPIRED';
          hint = 'Realiza login nuevamente para obtener un nuevo token';
        } else if (err.name === 'JsonWebTokenError') {
          errorMessage = 'Token malformado';
          errorCode = 'MALFORMED_TOKEN';
          hint = 'El token no tiene el formato JWT válido';
        }

        console.warn('⚠️ Error de autenticación:', {
          error: err.name,
          message: err.message,
          timestamp: new Date().toISOString(),
          token: token.substring(0, 20) + '...' // Solo los primeros caracteres por seguridad
        });

        return res.status(403).json({
          success: false,
          message: errorMessage,
          error: errorCode,
          hint: hint
        });
      }

      // Buscar el usuario en la base de datos
      const user = findUserById(decoded.userId);
      if (!user) {
        console.warn('⚠️ Usuario no encontrado para token válido:', {
          userId: decoded.userId,
          timestamp: new Date().toISOString()
        });

        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
          error: 'USER_NOT_FOUND',
          hint: 'El usuario asociado al token ya no existe'
        });
      }

      // Agregar información del usuario a la request
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      next();
    });
  } catch (error) {
    console.error('❌ Error en middleware de autenticación:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    res.status(500).json({
      success: false,
      message: 'Error interno en la autenticación',
      error: 'AUTH_MIDDLEWARE_ERROR',
      errorId: Date.now()
    });
  }
};

// Función para generar token JWT
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES // Tiempo de expiración desde variables de entorno
  });
};

module.exports = {
  authenticateToken,
  generateToken,
  JWT_SECRET,
  JWT_EXPIRES
};