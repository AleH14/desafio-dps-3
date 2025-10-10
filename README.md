# 📦 Sistema de Inventario

Sistema completo de gestión de inventario con funcionalidad de escaneo QR, desarrollado con backend en Node.js y frontend en React Native/Expo.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** (gestor de paquetes de Node.js)
- **Git**

---

## 🚀 Instalación del Backend

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

#### 4.1 Crear archivo de configuración

Crea un archivo `.env` en la carpeta `backend` basándote en el archivo `.env.example`:

```bash
cp .env.example .env
```

#### 4.2 Generar token JWT seguro

Ejecuta el siguiente comando para generar un token secreto:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Este comando generará una cadena alfanumérica aleatoria similar a:
```
9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08...
```

#### 4.3 Configurar el archivo .env

Abre el archivo `.env` con tu editor de texto favorito y configura las siguientes variables:

```env
JWT_SECRET=tu_token_generado_aqui
JWT_EXPIRES=1h
PORT=3000
```

**Ejemplo:**
```env
JWT_SECRET=9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
JWT_EXPIRES=1h
PORT=3000
```

> ⚠️ **Importante:** Nunca compartas tu `JWT_SECRET` públicamente ni lo subas a repositorios públicos.

### 5. Iniciar el servidor

```bash
npm start
```

El servidor debería iniciarse en `http://localhost:3000`

✅ **Backend configurado correctamente**

---

## 🎨 Instalación del Frontend

### 1. Navegar a la carpeta del frontend

Desde la raíz del proyecto:

```bash
cd desafio-dps-3
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la IP del servidor

#### 3.1 Localizar el archivo de configuración

El archivo de configuración se encuentra en:
```
frontend/services/api.js
```

#### 3.2 Obtener tu dirección IP local

**En Windows:**
```bash
ipconfig
```
Busca la línea que dice `Dirección IPv4` en tu adaptador de red activo.

**En Mac/Linux:**
```bash
ifconfig
```
o
```bash
ip addr show
```

Busca tu dirección IP local (generalmente empieza con `192.168.x.x` o `10.x.x.x`).

#### 3.3 Modificar el archivo api.js

Abre el archivo `frontend/services/api.js` y localiza la siguiente línea:

```javascript
const API_URL = 'http://localhost:3000';
```

Reemplaza `localhost` con tu dirección IP local:

```javascript
const API_URL = 'http://192.168.1.100:3000'; // Reemplaza con tu IP
```

**Ejemplo completo del archivo:**

```javascript
// frontend/services/api.js
const API_URL = 'http://192.168.1.100:3000'; // Tu IP local

export default {
  baseURL: API_URL,
  // ... resto de configuración
};
```

> 💡 **Nota:** Si estás ejecutando el frontend en un dispositivo físico, asegúrate de que el dispositivo esté en la misma red WiFi que tu computadora.

### 4. Iniciar la aplicación

```bash
npm start
```

✅ **Frontend configurado correctamente**

---

## 📱 Manual de Usuario

### Iniciar el Sistema Completo

1. **Inicia el backend:**
   ```bash
   cd backend
   npm start
   ```

2. **En otra terminal, inicia el frontend:**
   ```bash
   cd frontend
   npm start
   ```

### Iniciar Sesión

Al abrir la aplicación, ingresa las credenciales por defecto:

- **Usuario:** `Admin`
- **Contraseña:** `123456`

### Escanear Código QR

1. En la aplicación, dirígete a la sección de escaneo QR
2. Genera un código QR de prueba con un ID de producto en: https://www.qr-code-generator.com/
3. Escanea el código QR con la aplicación
4. Si el producto existe, se mostrarán sus detalles
5. Si el producto no existe, aparecerá una alerta informativa

---

## 📚 Documentación Adicional

- Para información detallada sobre los endpoints del API, consulta el archivo [README.md en la carpeta backend](./backend/README.md)

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express
- **Frontend:** React Native, Expo
- **Autenticación:** JWT
- **Escaneo QR:** Cámara nativa

---

## 👨‍💻 Desarrolladores

Este proyecto fue desarrollado por:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/marcelavasquez11">
        <img src="https://github.com/marcelavasquez11.png" width="100px;" alt="Marcela Vasquez"/><br />
        <sub><b>Marcela Vasquez</b></sub>
      </a><br />
      <a href="https://github.com/marcelavasquez11">@marcelavasquez11</a>
    </td>
    <td align="center">
      <a href="https://github.com/AleH14">
        <img src="https://github.com/AleH14.png" width="100px;" alt="Alejandro Hernandez"/><br />
        <sub><b>Alejandro Hernandez</b></sub>
      </a><br />
      <a href="https://github.com/AleH14">@AleH14</a>
    </td>
  </tr>
</table>

---

## 👥 Contribución

Si deseas contribuir al proyecto, por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 💬 Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.
