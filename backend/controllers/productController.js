const { 
  getAllProductos, 
  getProductoById, 
  getProductosByCategoria, 
  getProductosDisponibles, 
  searchProductos,
  getProductosStats,
  updateProductoStock
} = require('../models/productModel');

// Controlador para obtener todos los productos
const getProductos = async (req, res) => {
  try {
    const { categoria, disponible, search, limit, offset } = req.query;
    let productos;

    // Filtros opcionales
    if (search) {
      productos = searchProductos(search);
    } else if (categoria) {
      productos = getProductosByCategoria(categoria);
    } else if (disponible === 'true') {
      productos = getProductosDisponibles();
    } else {
      productos = getAllProductos();
    }

    // Paginación opcional
    let totalProductos = productos.length;
    if (limit) {
      const limitNum = parseInt(limit);
      const offsetNum = parseInt(offset) || 0;
      productos = productos.slice(offsetNum, offsetNum + limitNum);
    }

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Productos obtenidos exitosamente',
      data: {
        productos: productos,
        total: totalProductos,
        count: productos.length,
        pagination: limit ? {
          limit: parseInt(limit),
          offset: parseInt(offset) || 0,
          hasNext: (parseInt(offset) || 0) + parseInt(limit) < totalProductos
        } : null
      },
      user: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
      }
    });

  } catch (error) {
    console.error('❌ Error en getProductos:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      query: req.query,
      user: req.user
    });
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR',
      errorId: Date.now(),
      hint: 'Si el problema persiste, contacta al administrador'
    });
  }
};

// Controlador para obtener un producto específico por ID
const getProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un número
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'ID de producto inválido',
        error: 'INVALID_PRODUCT_ID',
        hint: 'El ID debe ser un número entero',
        received: id
      });
    }

    // Buscar el producto
    const producto = getProductoById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
        error: 'PRODUCT_NOT_FOUND',
        hint: 'Verifica que el ID del producto sea correcto',
        searchedId: parseInt(id)
      });
    }

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Producto encontrado exitosamente',
      data: {
        producto: producto
      },
      user: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
      }
    });

  } catch (error) {
    console.error('❌ Error en getProducto:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      productId: req.params.id,
      user: req.user
    });
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR',
      errorId: Date.now(),
      hint: 'Si el problema persiste, contacta al administrador'
    });
  }
};

// Controlador para obtener estadísticas de productos (endpoint adicional)
const getEstadisticas = async (req, res) => {
  try {
    const stats = getProductosStats();

    res.status(200).json({
      success: true,
      message: 'Estadísticas obtenidas exitosamente',
      data: {
        estadisticas: stats
      },
      user: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
      }
    });

  } catch (error) {
    console.error('❌ Error en getEstadisticas:', {
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

// Controlador para actualizar stock de un producto
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    // Validar que el ID sea un número
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'ID de producto inválido',
        error: 'INVALID_PRODUCT_ID',
        hint: 'El ID debe ser un número entero',
        received: id
      });
    }

    // Validar que se envíe el stock
    if (stock === undefined || stock === null) {
      return res.status(400).json({
        success: false,
        message: 'Stock es requerido',
        error: 'MISSING_STOCK',
        hint: 'Envía el campo "stock" en el cuerpo de la petición',
        example: { stock: 25 }
      });
    }

    // Validar que el stock sea un número válido
    if (isNaN(parseInt(stock)) || parseInt(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock debe ser un número entero mayor o igual a 0',
        error: 'INVALID_STOCK_VALUE',
        hint: 'El stock debe ser un número entero no negativo',
        received: {
          stock: stock,
          type: typeof stock
        }
      });
    }

    // Intentar actualizar el producto
    const resultado = updateProductoStock(id, parseInt(stock));

    if (resultado === null) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
        error: 'PRODUCT_NOT_FOUND',
        hint: 'Verifica que el ID del producto sea correcto',
        searchedId: parseInt(id)
      });
    }

    if (resultado === false) {
      return res.status(400).json({
        success: false,
        message: 'Error al actualizar stock',
        error: 'STOCK_UPDATE_ERROR',
        hint: 'Verifica que el valor del stock sea válido'
      });
    }

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: `Stock actualizado exitosamente ${resultado.disponible ? '(Producto disponible)' : '(Producto agotado)'}`,
      data: {
        producto: resultado,
        stockAnterior: stock !== resultado.stock ? 'No disponible' : resultado.stock,
        stockNuevo: resultado.stock,
        disponibilidad: resultado.disponible ? 'Disponible' : 'Agotado'
      },
      user: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en updateStock:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      productId: req.params.id,
      requestBody: req.body,
      user: req.user
    });
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR',
      errorId: Date.now(),
      hint: 'Si el problema persiste, contacta al administrador'
    });
  }
};

module.exports = {
  getProductos,
  getProducto,
  getEstadisticas,
  updateStock
};