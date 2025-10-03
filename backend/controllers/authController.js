const { findUserByUsername, validatePassword } = require('../models/userModel');
const { generateToken } = require('../middlewares/authMiddleware');

// Controlador de login
const login = async (req, res) => {
  try {
    // Verificar que req.body existe y no está vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se recibieron datos en el cuerpo de la petición',
        error: 'MISSING_BODY',
        hint: 'Asegúrate de enviar datos JSON y usar Content-Type: application/json'
      });
    }

    const { username, password } = req.body;

    // Validar que se envíen username y password
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username y password son requeridos',
        error: 'MISSING_CREDENTIALS',
        received: {
          username: username ? '✓' : '✗',
          password: password ? '✓' : '✗'
        },
        hint: 'Envía los campos "username" y "password" en el JSON'
      });
    }

    // Validar tipos de datos
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Username y password deben ser strings',
        error: 'INVALID_DATA_TYPE',
        types: {
          username: typeof username,
          password: typeof password
        }
      });
    }

    // Buscar usuario por username o email
    const user = findUserByUsername(username.trim());
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
        error: 'INVALID_CREDENTIALS',
        hint: 'Verifica tu username/email y contraseña'
      });
    }

    // Verificar password
    const isValidPassword = validatePassword(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
        error: 'INVALID_CREDENTIALS',
        hint: 'Verifica tu username/email y contraseña'
      });
    }

    // Generar token JWT
    const token = generateToken(user);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      expiresIn: '1h'
    });

  } catch (error) {
    console.error('❌ Error en login:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      body: req.body,
      headers: req.headers
    });
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR',
      errorId: Date.now(), // ID único para rastrear el error
      hint: 'Si el problema persiste, contacta al administrador'
    });
  }
};

// Controlador para obtener perfil del usuario autenticado
const getProfile = (req, res) => {
  try {
    // req.user viene del middleware authenticateToken
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No se pudo obtener la información del usuario',
        error: 'USER_NOT_FOUND_IN_REQUEST',
        hint: 'El token JWT podría estar malformado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Perfil obtenido exitosamente',
      user: req.user
    });
  } catch (error) {
    console.error('❌ Error en getProfile:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      user: req.user
    });

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR',
      errorId: Date.now()
    });
  }
};

// Controlador para verificar si el token es válido
const verifyToken = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o usuario no encontrado',
        error: 'USER_NOT_FOUND_IN_REQUEST'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token válido',
      user: req.user,
      verified: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en verifyToken:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      user: req.user
    });

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR',
      errorId: Date.now()
    });
  }
};

module.exports = {
  login,
  getProfile,
  verifyToken
};