// Datos ficticios de productos para testing
const productos = [
  {
    id: 1,
    nombre: "Smartphone Samsung Galaxy S24",
    descripcion: "Smartphone de alta gama con pantalla AMOLED de 6.2 pulgadas, procesador Snapdragon 8 Gen 3 y cámara de 50MP",
    precio: 899.99,
    categoria: "Electrónicos",
    subcategoria: "Smartphones",
    marca: "Samsung",
    stock: 25,
    disponible: true,
    imagen: "https://buketomnisportpweb.s3.us-east-2.amazonaws.com/products-images/aWa8ZRhnZkvWl9h4VSGrNcyz6SGB1rSrDVYrm9JG.png", // Espacio para imagen que se agregará después
    imagenes: [], // Array para múltiples imágenes
    especificaciones: {
      pantalla: "6.2\" AMOLED",
      procesador: "Snapdragon 8 Gen 3",
      ram: "8GB",
      almacenamiento: "256GB",
      camara: "50MP + 12MP + 10MP",
      bateria: "4000mAh"
    },
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-10-01",
    valoraciones: {
      promedio: 4.5,
      total: 128
    }
  },
  {
    id: 2,
    nombre: "Laptop Dell XPS 15",
    descripcion: "Laptop profesional con pantalla 4K, procesador Intel i7 de 13va generación y tarjeta gráfica NVIDIA RTX 4060",
    precio: 1899.99,
    categoria: "Electrónicos",
    subcategoria: "Laptops",
    marca: "Dell",
    stock: 12,
    disponible: true,
    imagen: "https://m.media-amazon.com/images/I/61qwCycNaxL._UF894,1000_QL80_.jpg",
    imagenes: [],
    especificaciones: {
      pantalla: "15.6\" 4K OLED",
      procesador: "Intel Core i7-13700H",
      ram: "16GB DDR5",
      almacenamiento: "1TB SSD",
      grafica: "NVIDIA RTX 4060",
      peso: "2.0 kg"
    },
    fechaCreacion: "2024-02-20",
    fechaActualizacion: "2024-09-28",
    valoraciones: {
      promedio: 4.7,
      total: 85
    }
  },
  {
    id: 3,
    nombre: "Auriculares Sony WH-1000XM5",
    descripcion: "Auriculares inalámbricos con cancelación de ruido líder en la industria y calidad de audio Hi-Res",
    precio: 349.99,
    categoria: "Electrónicos",
    subcategoria: "Audio",
    marca: "Sony",
    stock: 45,
    disponible: true,
    imagen: "https://www.sony.com.sv/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFhttps://buketomnisportpweb.s3.us-east-2.amazonaws.com/seo/UOyM18uXiMZH0Frgsp6b5QX6psYv6JsXtkkv6H6T.jpeg",
    imagenes: [],
    especificaciones: {
      tipo: "Over-ear inalámbricos",
      cancelacionRuido: "Activa",
      bateria: "30 horas",
      conectividad: "Bluetooth 5.2, NFC",
      codecs: "LDAC, AAC, SBC",
      peso: "250g"
    },
    fechaCreacion: "2024-03-10",
    fechaActualizacion: "2024-09-25",
    valoraciones: {
      promedio: 4.8,
      total: 203
    }
  },
  {
    id: 4,
    nombre: "Smartwatch Apple Watch Series 9",
    descripcion: "Smartwatch avanzado con GPS, monitor de salud, pantalla Always-On y resistencia al agua",
    precio: 429.99,
    categoria: "Electrónicos",
    subcategoria: "Wearables",
    marca: "Apple",
    stock: 30,
    disponible: true,
    imagen: "https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-graphite-stainless-steel-FineWoven-Magenetic-Link-green-230912_inline.jpg.large.jpg",
    imagenes: [],
    especificaciones: {
      pantalla: "1.9\" Retina Always-On",
      chip: "S9 SiP",
      almacenamiento: "64GB",
      conectividad: "GPS + Cellular",
      sensores: "ECG, SpO2, Temperatura",
      resistencia: "WR50"
    },
    fechaCreacion: "2024-04-05",
    fechaActualizacion: "2024-09-30",
    valoraciones: {
      promedio: 4.6,
      total: 156
    }
  },
  {
    id: 5,
    nombre: "Tablet iPad Air 5ta Generación",
    descripcion: "Tablet potente con chip M1, pantalla Liquid Retina de 10.9 pulgadas y compatibilidad con Apple Pencil",
    precio: 749.99,
    categoria: "Electrónicos",
    subcategoria: "Tablets",
    marca: "Apple",
    stock: 18,
    disponible: true,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7_ySymtbh--zUi2nrjKXVujjQmfZntkzdOA&https://entelconviene.entel.cl/media/catalog/product/cache/e83b319fe15d087a014efa16f11c0f36/1/_/1_4.jpg",
    imagenes: [],
    especificaciones: {
      pantalla: "10.9\" Liquid Retina",
      chip: "Apple M1",
      ram: "8GB",
      almacenamiento: "256GB",
      camaras: "12MP Wide + 12MP Ultra Wide",
      compatibilidad: "Apple Pencil 2, Magic Keyboard"
    },
    fechaCreacion: "2024-05-12",
    fechaActualizacion: "2024-09-22",
    valoraciones: {
      promedio: 4.4,
      total: 94
    }
  },
  {
    id: 6,
    nombre: "Cámara Canon EOS R6 Mark II",
    descripcion: "Cámara mirrorless profesional con sensor full-frame de 24.2MP y grabación de video 4K",
    precio: 2499.99,
    categoria: "Hogar y Jardín",
    subcategoria: "Electrodomésticos",
    marca: "Canon",
    stock: 8,
    disponible: true,
    imagen: "https://m.media-amazon.com/images/I/61edAuPV2uL._UF894,1000_QL80_.jpg",
    imagenes: [],
    especificaciones: {
      sensor: "Full-frame CMOS 24.2MP",
      video: "4K 60p, Full HD 180p",
      estabilizacion: "IBIS de 8 pasos",
      enfoque: "1053 puntos Dual Pixel",
      iso: "100-102400",
      peso: "588g"
    },
    fechaCreacion: "2024-06-08",
    fechaActualizacion: "2024-09-20",
    valoraciones: {
      promedio: 4.9,
      total: 47
    }
  },
  {
    id: 7,
    nombre: "Aspiradora Robot Roomba i7+",
    descripcion: "Aspiradora robot inteligente con base de auto-vaciado y mapeo avanzado para limpieza automática",
    precio: 499.99,
    categoria: "Hogar y Jardín",
    subcategoria: "Electrodomésticos",
    marca: "iRobot",
    stock: 15,
    disponible: true,
    imagen: "https://coolboxpe.vtexassets.com/arquivos/ids/372195-800-800?v=638726383800530000&width=800&height=800&aspect=truhttps://img.pacifiko.com/PROD/resize/1/1000x1000/B0C415NHBM.jpg",
    imagenes: [],
    especificaciones: {
      navegacion: "vSLAM con cámara",
      autonomia: "75 minutos",
      capacidad: "Base auto-vaciado 60 días",
      filtros: "HEPA de 3 etapas",
      conectividad: "WiFi, Alexa, Google",
      peso: "3.4 kg"
    },
    fechaCreacion: "2024-07-15",
    fechaActualizacion: "2024-09-18",
    valoraciones: {
      promedio: 4.3,
      total: 312
    }
  },
  {
    id: 8,
    nombre: "Cafetera Espresso Breville Barista Express",
    descripcion: "Máquina de espresso con molinillo integrado, vaporizador de leche y control de temperatura",
    precio: 449.99,
    categoria: "Hogar y Jardín",
    subcategoria: "Electrodomésticos",
    marca: "Breville",
    stock: 22,
    disponible: true,
    imagen: "https://www.breville.com/content/dam/breville-brands/microsites/barista-express-impress/SKUDetails_851x638.jpg",
    imagenes: [],
    especificaciones: {
      presion: "15 bares",
      molinillo: "Cónico de acero inoxidable",
      capacidad_agua: "2L",
      calentamiento: "Thermocoil",
      vaporizador: "Manual 360°",
      dimensiones: "31x33x40 cm"
    },
    fechaCreacion: "2024-08-03",
    fechaActualizacion: "2024-09-15",
    valoraciones: {
      promedio: 4.2,
      total: 67
    }
  },
  {
    id: 9,
    nombre: "Set de Sartenes Antiadherentes Tefal",
    descripcion: "Juego de 3 sartenes antiadherentes con indicador de temperatura y mango extraíble",
    precio: 299.99,
    categoria: "Hogar y Jardín",
    subcategoria: "Cocina",
    marca: "Tefal",
    stock: 35,
    disponible: true,
    imagen: "https://www.cristalerialaunica.com.mx/cdn/shop/files/0552531-2_0d24b767-b050-4a36-a3d3-d76f5a026642.jpg?v=1751652185",
    imagenes: [],
    especificaciones: {
      tamaños: "20cm, 24cm, 28cm",
      recubrimiento: "Titanium Excellence",
      indicador: "Thermo-Spot",
      base: "Inducción compatible",
      mango: "Extraíble hasta 175°C",
      garantia: "2 años"
    },
    fechaCreacion: "2024-09-01",
    fechaActualizacion: "2024-09-12",
    valoraciones: {
      promedio: 4.1,
      total: 29
    }
  },
  {
    id: 10,
    nombre: "Purificador de Aire Dyson Pure Cool",
    descripcion: "Purificador y ventilador 2 en 1 con filtro HEPA y carbón activado, control inteligente",
    precio: 199.99,
    categoria: "Hogar y Jardín",
    subcategoria: "Electrodomésticos",
    marca: "Dyson",
    stock: 50,
    disponible: true,
    imagen: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/campaigns/plp-2024/LEAP-CampaignPage_Module1.jpg?$responsive$&cropPathE=mobile&fit=stretch,1&wid=640",
    imagenes: [],
    especificaciones: {
      filtracion: "HEPA H13 + Carbón activado",
      cobertura: "Hasta 81m²",
      sensores: "PM2.5, PM10, VOC, NO2",
      conectividad: "WiFi, App Dyson Link",
      modos: "Auto, Noche, Difusión",
      ruido: "Desde 40dB"
    },
    fechaCreacion: "2024-09-10",
    fechaActualizacion: "2024-09-10",
    valoraciones: {
      promedio: 4.7,
      total: 183
    }
  }
];

// Función para obtener todos los productos
const getAllProductos = () => {
  return productos;
};

// Función para obtener un producto por ID
const getProductoById = (id) => {
  return productos.find(producto => producto.id === parseInt(id));
};

// Función para obtener productos por categoría
const getProductosByCategoria = (categoria) => {
  return productos.filter(producto => 
    producto.categoria.toLowerCase() === categoria.toLowerCase()
  );
};

// Función para obtener productos disponibles
const getProductosDisponibles = () => {
  return productos.filter(producto => producto.disponible && producto.stock > 0);
};

// Función para buscar productos por nombre o descripción
const searchProductos = (query) => {
  const searchTerm = query.toLowerCase();
  return productos.filter(producto => 
    producto.nombre.toLowerCase().includes(searchTerm) ||
    producto.descripcion.toLowerCase().includes(searchTerm) ||
    producto.marca.toLowerCase().includes(searchTerm)
  );
};

// Función para actualizar stock de un producto
const updateProductoStock = (id, newStock) => {
  const productoIndex = productos.findIndex(producto => producto.id === parseInt(id));
  
  if (productoIndex === -1) {
    return null; // Producto no encontrado
  }

  // Validar que el stock sea un número válido
  if (isNaN(newStock) || newStock < 0) {
    return false; // Stock inválido
  }

  // Actualizar stock y disponibilidad
  productos[productoIndex].stock = parseInt(newStock);
  productos[productoIndex].disponible = productos[productoIndex].stock > 0;
  productos[productoIndex].fechaActualizacion = new Date().toISOString().split('T')[0];

  return productos[productoIndex]; // Retornar producto actualizado
};

// Función para obtener estadísticas de productos
const getProductosStats = () => {
  return {
    total: productos.length,
    disponibles: productos.filter(p => p.disponible).length,
    agotados: productos.filter(p => p.stock === 0).length,
    categorias: [...new Set(productos.map(p => p.categoria))],
    marcas: [...new Set(productos.map(p => p.marca))],
    valoracionPromedio: (productos.reduce((sum, p) => sum + p.valoraciones.promedio, 0) / productos.length).toFixed(2)
  };
};

module.exports = {
  productos,
  getAllProductos,
  getProductoById,
  getProductosByCategoria,
  getProductosDisponibles,
  searchProductos,
  getProductosStats,
  updateProductoStock
};