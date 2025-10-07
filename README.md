# Backend - API de Productos

Este es el backend de la aplicación de gestión de productos. Proporciona una API RESTful con autenticación JWT para gestionar productos.

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm (gestor de paquetes de Node.js)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/AleH14/desafio-dps-3.git
```

### 2. Navegar a la carpeta del backend

```bash
cd desafio-dps-3
cd backend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend` basándote en el archivo `.env.example`:

```bash
cp .env.example .env
```

Genera un token secreto seguro ejecutando:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copia el resultado y pégalo en tu archivo `.env`:

```env
JWT_SECRET=tu_token_generado_aqui
JWT_EXPIRES=1h
```

### 5. Iniciar el servidor

```bash
npm start
```

El servidor debería iniciarse en `http://localhost:3000`

---

## 🔑 Autenticación

### Obtener un token de acceso

Para utilizar la API, primero debes autenticarte y obtener un token JWT.

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "username": "admin",
  "password": "123456"
}
```

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1h"
}
```

> ⚠️ **Importante:** Guarda el token, lo necesitarás para todas las demás peticiones.

---

## 📦 Endpoints de Productos

Todos los endpoints de productos requieren el token de autenticación en el header `Authorization`.

### 1. Listar todos los productos

**Endpoint:** `GET /productos`

**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
```

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/productos \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Samsung Galaxy S21",
      "descripcion": "Smartphone de alta gama",
      "precio": 799.99,
      "stock": 25,
      "categoria": "Electrónicos",
      "imagen": "url_imagen"
    },
    {
      "id": 2,
      "nombre": "MacBook Pro",
      "descripcion": "Laptop profesional",
      "precio": 1999.99,
      "stock": 10,
      "categoria": "Computadoras",
      "imagen": "url_imagen"
    }
  ]
}
```

### 2. Obtener un producto específico

**Endpoint:** `GET /productos/:id`

**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
```

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/productos/1 \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Samsung Galaxy S21",
    "descripcion": "Smartphone de alta gama",
    "precio": 799.99,
    "stock": 25,
    "categoria": "Electrónicos",
    "imagen": "url_imagen"
  }
}
```

**Error si no existe:**
```json
{
  "success": false,
  "message": "Producto no encontrado"
}
```

### 3. Buscar productos

**Endpoint:** `GET /productos?search=termino`

**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
```

**Ejemplo con curl:**
```bash
curl -X GET "http://localhost:3000/productos?search=samsung" \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Samsung Galaxy S21",
      "descripcion": "Smartphone de alta gama",
      "precio": 799.99,
      "stock": 25,
      "categoria": "Electrónicos",
      "imagen": "url_imagen"
    },
    {
      "id": 5,
      "nombre": "Samsung TV 55\"",
      "descripcion": "Smart TV 4K",
      "precio": 699.99,
      "stock": 15,
      "categoria": "Electrónicos",
      "imagen": "url_imagen"
    }
  ]
}
```

### 4. Filtrar por categoría

**Endpoint:** `GET /productos?categoria=nombre_categoria`

**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
```

**Ejemplo con curl:**
```bash
curl -X GET "http://localhost:3000/productos?categoria=Electrónicos" \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Samsung Galaxy S21",
      "descripcion": "Smartphone de alta gama",
      "precio": 799.99,
      "stock": 25,
      "categoria": "Electrónicos",
      "imagen": "url_imagen"
    },
    {
      "id": 3,
      "nombre": "iPhone 13",
      "descripcion": "Smartphone Apple",
      "precio": 999.99,
      "stock": 30,
      "categoria": "Electrónicos",
      "imagen": "url_imagen"
    }
  ]
}
```

### 5. Actualizar stock de un producto

**Endpoint:** `PUT /productos/:id`

**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json
```

**Body:**
```json
{
  "stock": 50
}
```

**Ejemplo con curl:**
```bash
curl -X PUT http://localhost:3000/productos/1 \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"stock":50}'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Stock actualizado correctamente",
  "data": {
    "id": 1,
    "nombre": "Samsung Galaxy S21",
    "descripcion": "Smartphone de alta gama",
    "precio": 799.99,
    "stock": 50,
    "categoria": "Electrónicos",
    "imagen": "url_imagen"
  }
}
```

---

## ⚠️ Manejo de Errores

### Token inválido o expirado
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

### Sin autorización
```json
{
  "success": false,
  "message": "No se proporcionó token de autenticación"
}
```

### Credenciales incorrectas
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcrypt (para encriptación de contraseñas)

---

## 📝 Notas

- El token JWT expira en 1 hora por defecto (configurable en `.env`)
- Las credenciales por defecto son: `admin` / `123456`
- Asegúrate de mantener tu `JWT_SECRET` seguro y no compartirlo públicamente
- El archivo `.env` está incluido en `.gitignore` para proteger tus credenciales

---

## 🐛 Solución de Problemas

### El servidor no inicia
- Verifica que todas las dependencias estén instaladas: `npm install`
- Asegúrate de que el archivo `.env` exista y tenga las variables correctas
- Revisa que el puerto 3000 no esté siendo utilizado por otra aplicación

### Error de autenticación
- Verifica que el token sea válido y no haya expirado
- Asegúrate de incluir "Bearer " antes del token en el header Authorization
- Genera un nuevo token haciendo login nuevamente

### No se encuentran productos
- Verifica que la base de datos esté inicializada correctamente
- Revisa los logs del servidor para más detalles
  
# Frontend -Interfaz

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/AleH14/desafio-dps-3.git
```

### 2. Navegar a la carpeta del frontend

```bash
cd desafio-dps-3
cd frontend
```

### 3. Instalar dependencias

```bash
npm install
```
### 3. Configurar IP
Modifica el archivo api.js que se encuentra en 
```bash
frontend/services/api.js
```
Ahi coloca tu IP

# 🗃️ Manual de usuario
### Iniciar sesion
Inicia el frontend y backend 
```bash
npm install
```

### Iniciar sesion

Ingresa un usuario y contraseña por ejemplo:
usuario: admin
contraseña: 123456

### Escanear QR 

Genera el codigo qr de un numero en https://www.qr-code-generator.com/ y luego escanealo y veras el producto con ese ID, si no existe ningun producto con ese ID te mostrara una alerta.
