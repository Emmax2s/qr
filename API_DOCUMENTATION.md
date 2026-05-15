# Documentación API REST - ZooMAT

## Información General

- **Versión API:** 1.0.0
- **Base URL:** `https://pruzo.me/api` (producción) | `http://localhost:5000/api` (desarrollo)
- **Autenticación:** JWT Bearer Token
- **Formato de respuesta:** JSON
- **Encoding:** UTF-8

---

## 1. AUTENTICACIÓN

### 1.1 POST /auth/login

**Descripción:** Autenticar usuario y obtener JWT token.

**Endpoint:** `POST /api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Autenticación exitosa",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "email": "admin@zoomat.mx",
    "role": "admin"
  },
  "expiresIn": "24h"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Usuario o contraseña incorrectos",
  "code": "INVALID_CREDENTIALS"
}
```

**Rate Limit:** 5 intentos cada 15 minutos

---

### 1.2 GET /auth/verify

**Descripción:** Verifica validez del token JWT.

**Endpoint:** `GET /api/auth/verify`

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "valid": true,
  "user": {
    "username": "admin",
    "timestamp": 1715784600000
  }
}
```

---

### 1.3 POST /auth/logout

**Descripción:** Cierra sesión (cliente debe eliminar token).

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
}
```

---

## 2. ESPECIES

### 2.1 GET /species

**Descripción:** Obtiene lista de todas las especies.

**Endpoint:** `GET /api/species`

**Query Parameters:**
- `limit` (number, opcional): Límite de registros (default: 100, max: 1000)
- `offset` (number, opcional): Desplazamiento para paginación
- `estado` (string, opcional): Filtrar por estado de conservación
- `dieta` (string, opcional): Filtrar por tipo de dieta

**Example:**
```
GET /api/species?limit=20&offset=0&estado=En Peligro de Extincion
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Jaguar",
      "nombreCientifico": "Panthera onca",
      "descripcion": "Felino de gran tamaño...",
      "habitat": "Selva tropical",
      "dieta": "Carnívoro",
      "estado": "En Peligro de Extincion",
      "imagen": "https://zoomat.mx/images/jaguar.jpg",
      "audio": "https://zoomat.mx/audio/jaguar-es.mp3",
      "createdAt": "2026-05-15T10:00:00Z"
    }
  ],
  "total": 50,
  "limit": 20,
  "offset": 0
}
```

---

### 2.2 GET /species/{id}

**Descripción:** Obtiene detalles de una especie específica.

**Endpoint:** `GET /api/species/1`

**Path Parameters:**
- `id` (number, required): ID de la especie

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Jaguar",
    "nombreCientifico": "Panthera onca",
    "descripcion": "Felino de gran tamaño endémico de Chiapas, México...",
    "habitat": "Selva tropical",
    "dieta": "Carnívoro",
    "estado": "En Peligro de Extincion",
    "imagen": "https://zoomat.mx/images/jaguar.jpg",
    "audio": "https://zoomat.mx/audio/jaguar-es.mp3",
    "createdAt": "2026-05-15T10:00:00Z",
    "updatedAt": "2026-05-15T10:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Especie no encontrada",
  "code": "SPECIES_NOT_FOUND"
}
```

---

### 2.3 POST /admin/species (Requiere autenticación)

**Descripción:** Crea una nueva especie.

**Endpoint:** `POST /api/admin/species`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "nombre": "Tucán Pico Iris",
  "nombreCientifico": "Ramphastos sulfuratus",
  "descripcion": "Ave tropical con pico colorido...",
  "habitat": "Selva tropical",
  "dieta": "Omnívoro",
  "estado": "Amenazada",
  "imagen": "https://zoomat.mx/images/tucan.jpg",
  "audio": "https://zoomat.mx/audio/tucan-es.mp3"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Especie creada correctamente",
  "data": {
    "id": 7,
    "nombre": "Tucán Pico Iris",
    ...
  }
}
```

---

### 2.4 PUT /admin/species/{id} (Requiere autenticación)

**Descripción:** Actualiza información de una especie.

**Endpoint:** `PUT /api/admin/species/1`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:** (todos los campos opcionales)
```json
{
  "estado": "En Peligro de Extincion",
  "descripcion": "Información actualizada..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Especie actualizada correctamente",
  "data": { ... }
}
```

---

### 2.5 DELETE /admin/species/{id} (Requiere autenticación)

**Descripción:** Elimina una especie.

**Endpoint:** `DELETE /api/admin/species/1`

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Especie eliminada correctamente"
}
```

---

## 3. ANALYTICS

### 3.1 GET /analytics

**Descripción:** Obtiene estadísticas de uso del sistema.

**Endpoint:** `GET /api/analytics`

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "summary": {
    "totalRequests": 1250,
    "averageResponseTime": "45.3ms",
    "byMethod": {
      "GET": 950,
      "POST": 200,
      "PUT": 50,
      "DELETE": 50
    },
    "byPath": {
      "/api/species": 500,
      "/api/admin/species": 150,
      "/api/auth/login": 100
    },
    "recentLogs": [
      {
        "timestamp": "2026-05-15T14:30:00Z",
        "method": "GET",
        "path": "/api/species/1",
        "statusCode": 200,
        "duration": "42ms",
        "ip": "192.168.1.100",
        "user": "admin"
      }
    ]
  }
}
```

---

## 4. CÓDIGOS DE ESTADO HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Autenticación requerida |
| 403 | Forbidden - Permisos insuficientes |
| 404 | Not Found - Recurso no encontrado |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error - Error del servidor |

---

## 5. CÓDIGOS DE ERROR

| Código | Descripción |
|--------|-------------|
| INVALID_CREDENTIALS | Usuario o contraseña incorrectos |
| MISSING_TOKEN | Token no proporcionado |
| INVALID_TOKEN | Token inválido o expirado |
| SPECIES_NOT_FOUND | Especie no existe |
| INVALID_REQUEST | Datos de solicitud inválidos |
| UNAUTHORIZED | Acción no autorizada |
| SERVER_ERROR | Error interno del servidor |
| RATE_LIMIT_EXCEEDED | Límite de solicitudes excedido |

---

## 6. VALIDACIONES

### 6.1 Campos de Species

```
nombre: string (1-100 caracteres, requerido)
nombreCientifico: string (1-100 caracteres, requerido)
descripcion: string (0-1000 caracteres)
habitat: string (0-500 caracteres)
dieta: enum ('Carnívoro' | 'Herbívoro' | 'Omnívoro' | 'Insectívoro')
estado: enum ('En Peligro de Extincion' | 'Amenazada' | 'Protegida Especial' | 'Fuera de Peligro')
imagen: string (URL válida)
audio: string (URL válida)
```

### 6.2 Campos de Login

```
username: string (3-50 caracteres, alfanuméricos, requerido)
password: string (6-255 caracteres, requerido)
```

---

## 7. EJEMPLOS CURL

### Autenticarse
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Obtener lista de especies
```bash
curl -X GET http://localhost:5000/api/species?limit=10
```

### Obtener especie específica
```bash
curl -X GET http://localhost:5000/api/species/1
```

### Crear especie (autenticado)
```bash
curl -X POST http://localhost:5000/api/admin/species \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Nueva Especie",
    "nombreCientifico":"Genus species",
    "dieta":"Omnívoro",
    "estado":"Amenazada"
  }'
```

### Obtener analytics
```bash
curl -X GET http://localhost:5000/api/analytics \
  -H "Authorization: Bearer {token}"
```

---

## 8. RATE LIMITING

- **General:** 100 solicitudes por 15 minutos por IP
- **Login:** 5 intentos por 15 minutos por IP
- **Header:** `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`

---

## 9. NOTAS DE SEGURIDAD

- Todos los tokens expiran en **24 horas**
- Las contraseñas se almacenan con **bcrypt hash** (10 salts)
- Implementar **HTTPS en producción**
- Usar **CORS** solo con dominios autorizados
- Validar **todas las entradas** en servidor
- Implementar **CSRF tokens** para operaciones POST/PUT/DELETE
- Registrar **todos los accesos** para auditoría

---

**Última actualización:** 15 de mayo de 2026  
**Versión de API:** 1.0.0
