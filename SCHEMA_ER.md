# Esquema Entidad-Relación (ER) - ZooMAT

## Descripción

Sistema de información interactivo del Zoológico Miguel Álvarez del Toro con autenticación JWT, logging, rate limiting y documentación API formal.

### Entidades Principales:

1. **Species** - Catálogo de especies (id, nombre, nombreCientifico, estado, etc.)
2. **Users** - Administradores (username, email, password_hash, role)
3. **AccessLogs** - Auditoría (method, path, statusCode, userId, timestamp)
4. **SpeciesAnalytics** - Estadísticas (speciesId, totalViews, avgTimeSpent)

### Relaciones:
- Users (1:N) AccessLogs
- Species (1:1) SpeciesAnalytics

### Normalización: 3FN (Tercera Forma Normal)

Todos los campos siguen restricciones de integridad referencial, sin dependencias transitivas.
