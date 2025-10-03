const express = require('express');
const router = express.Router();
const { getProductos, getProducto, getEstadisticas, updateStock } = require('../controllers/productController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Todas las rutas de productos requieren autenticación
router.use(authenticateToken);

// GET /productos - Obtener listado de productos (requiere token)
router.get('/', getProductos);

// GET /productos/stats - Obtener estadísticas de productos (requiere token)
router.get('/stats', getEstadisticas);

// PUT /productos/:id - Actualizar stock de producto específico (requiere token)
router.put('/:id', updateStock);

// GET /productos/:id - Obtener producto específico por ID (requiere token)
router.get('/:id', getProducto);

module.exports = router;