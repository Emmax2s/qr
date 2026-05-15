# API REST Documentation - ZooMAT

## Endpoints Implementados

### Autenticación
- POST /api/auth/login - Obtener JWT token
- GET /api/auth/verify - Verificar token válido
- POST /api/auth/logout - Cerrar sesión

### Especies (Público)
- GET /api/species - Listar todas las especies
- GET /api/species/{id} - Obtener especie específica

### Admin (Requiere JWT)
- POST /api/admin/species - Crear especie
- PUT /api/admin/species/{id} - Actualizar especie
- DELETE /api/admin/species/{id} - Eliminar especie
- GET /api/analytics - Ver estadísticas de acceso

## Seguridad Implementada

- **JWT + bcrypt**: Autenticación y hash irreversible
- **Rate Limiting**: 100 req/15min general, 5 intentos login
- **CORS**: Solo dominios autorizados
- **Security Headers**: Helmet.js (CSP, X-Frame-Options, etc.)
- **Logging**: Todos los accesos registrados
- **Validación**: Esquemas JSON en entrada

## Rate Limits

- General API: 100 solicitudes por 15 minutos por IP
- Login: 5 intentos por 15 minutos (error only)
- Analytics: Requiere autenticación

## Respuestas

Success (200): { success: true, data: {...}, message: "..." }
Error (4xx/5xx): { success: false, code: "ERROR_CODE", message: "..." }
