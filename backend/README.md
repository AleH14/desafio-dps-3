# 📡 Backend API - Sistema de Inventario

Documentación completa de los endpoints del API del Sistema de Inventario.

---

## 🔧 Configuración

Asegúrate de haber seguido los pasos de instalación en el [README principal](../README.md).

---

## 🌐 Endpoints

### Base URL

```
http://localhost:3000/api
```

---

## 🔐 Autenticación

### Registro de Usuario

**POST** `/auth/register`

**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

---

### Inicio de Sesión

**POST** `/auth/login`

**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "token": "jwt_token_string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

---

## 📦 Productos

### Listar Productos

**GET** `/products`

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "quantity": "number",
      "qrCode": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

---

### Obtener Producto por ID

**GET** `/products/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros:**
- `id`: ID del producto

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "quantity": "number",
    "qrCode": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Producto no encontrado"
}
```

---

### Buscar Producto por Código QR

**GET** `/products/qr/:qrCode`

**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros:**
- `qrCode`: Código QR del producto

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "quantity": "number",
    "qrCode": "string"
  }
}
```

---

### Crear Producto

**POST** `/products`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "quantity": "number",
  "qrCode": "string"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "quantity": "number",
    "qrCode": "string"
  }
}
```

---

### Actualizar Producto

**PUT** `/products/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros:**
- `id`: ID del producto a actualizar

**Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "quantity": "number"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "quantity": "number"
  }
}
```

---

### Eliminar Producto

**DELETE** `/products/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros:**
- `id`: ID del producto a eliminar

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Producto eliminado exitosamente"
}
```

---

## 📊 Inventario

### Actualizar Stock

**PATCH** `/inventory/:id/stock`

**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros:**
- `id`: ID del producto

**Body:**
```json
{
  "quantity": "number",
  "operation": "add | subtract | set"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Stock actualizado",
  "data": {
    "id": "string",
    "quantity": "number"
  }
}
```

---

## 🔒 Códigos de Estado

| Código | Descripción |
|--------|-------------|
| 200 | Solicitud exitosa |
| 201 | Recurso creado exitosamente |
| 400 | Solicitud incorrecta (error de validación) |
| 401 | No autenticado (token inválido o ausente) |
| 403 | No autorizado (sin permisos) |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## 🔑 Autenticación JWT

Todos los endpoints (excepto `/auth/login` y `/auth/register`) requieren un token JWT válido en el header:

```
Authorization: Bearer {tu_token_jwt}
```

El token se obtiene al iniciar sesión y debe incluirse en todas las peticiones subsecuentes.

**Tiempo de expiración:** Configurado en el archivo `.env` (por defecto 1 hora)

---

## 🧪 Probar la API

### Usando cURL

**Ejemplo - Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

**Ejemplo - Obtener productos:**
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer tu_token_aqui"
```

### Usando Postman

1. Importa la colección de endpoints
2. Configura la variable de entorno `base_url` como `http://localhost:3000/api`
3. Realiza login y copia el token
4. Configura el token en la pestaña de Authorization de los demás endpoints

---

## 🐛 Errores Comunes

### Error: "Token no proporcionado"
**Solución:** Asegúrate de incluir el header `Authorization: Bearer {token}` en tu petición.

### Error: "Token inválido o expirado"
**Solución:** Genera un nuevo token haciendo login nuevamente.

### Error: "Producto no encontrado"
**Solución:** Verifica que el ID o código QR del producto sea correcto.

---

## 📞 Soporte

Para reportar bugs o solicitar nuevas características, abre un issue en el repositorio principal.