// Cargar variables de entorno primero
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'API de Autenticación JWT - Desafío DPS 3',
    version: '1.0.0',
    endpoints: {
      login: 'POST /auth/login',
      profile: 'GET /auth/profile (requiere token)',
      verify: 'GET /auth/verify (requiere token)'
    }
  });
});

// Rutas de autenticación
app.use('/auth', authRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    error: 'ENDPOINT_NOT_FOUND',
    requested: {
      method: req.method,
      url: req.url,
      path: req.path
    },
    available: {
      login: 'POST /auth/login',
      profile: 'GET /auth/profile (requiere token)',
      verify: 'GET /auth/verify (requiere token)',
      docs: 'GET /'
    }
  });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  console.error('❌ Error no manejado:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers['content-type']
  });

  // Error de parsing JSON
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      success: false,
      message: 'JSON malformado en el cuerpo de la petición',
      error: 'INVALID_JSON',
      hint: 'Verifica que el JSON esté correctamente formateado',
      details: error.message
    });
  }

  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: 'INTERNAL_SERVER_ERROR',
    errorId: Date.now(),
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📚 Documentación de endpoints disponible en http://localhost:${port}`);
});
