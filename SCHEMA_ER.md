# Esquema Entidad-Relación (ER) - ZooMAT

## 1. Descripción General

El esquema ER del sistema ZooMAT está diseñado bajo un modelo relacional que garantiza integridad referencial, escalabilidad y normalización de datos. Aunque actualmente los datos se almacenan en memoria (sin BD MySQL en esta versión), el esquema está estructurado para facilitar migración a una base de datos relacional en futuro.

---

## 2. Entidades Principales

### 2.1 Entidad: **Species** (Especies)

**Descripción:** Contiene información biológica y taxonómica de las especies del zoológico.

| Campo | Tipo | Constraint | Descripción |
|-------|------|-----------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| nombre | VARCHAR(100) | NOT NULL, UNIQUE | Nombre común de la especie |
| nombreCientifico | VARCHAR(100) | NOT NULL | Nomenclatura binomial |
| descripcion | TEXT | NOT NULL | Descripción detallada |
| habitat | VARCHAR(500) | NOT NULL | Hábitat natural |
| dieta | ENUM | NOT NULL | Tipo de alimentación |
| estado | ENUM | NOT NULL | Estado de conservación (NOM-059) |
| imagen | VARCHAR(500) | NULLABLE | URL de imagen principal |
| audio | VARCHAR(500) | NULLABLE | URL de narración en audio |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |
| updatedAt | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Fecha de última actualización |

**Valores permitidos:**
- `dieta`: 'Carnívoro', 'Herbívoro', 'Omnívoro', 'Insectívoro'
- `estado`: 'En Peligro de Extincion', 'Amenazada', 'Protegida Especial', 'Fuera de Peligro'

---

### 2.2 Entidad: **Users** (Usuarios Administrativos)

**Descripción:** Administradores del sistema con credenciales encriptadas.

| Campo | Tipo | Constraint | Descripción |
|-------|------|-----------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| username | VARCHAR(50) | NOT NULL, UNIQUE | Nombre de usuario |
| email | VARCHAR(100) | NOT NULL, UNIQUE | Correo electrónico |
| password | VARCHAR(255) | NOT NULL | Hash bcrypt de contraseña |
| role | ENUM | NOT NULL, DEFAULT 'editor' | Rol del usuario |
| isActive | BOOLEAN | DEFAULT TRUE | Estado del usuario |
| lastLogin | DATETIME | NULLABLE | Última sesión iniciada |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

**Valores permitidos:**
- `role`: 'admin', 'editor', 'viewer'

---

### 2.3 Entidad: **AccessLogs** (Logs de Acceso)

**Descripción:** Registra todas las solicitudes HTTP para auditoría y analytics.

| Campo | Tipo | Constraint | Descripción |
|-------|------|-----------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| method | VARCHAR(10) | NOT NULL | Método HTTP |
| path | VARCHAR(255) | NOT NULL | Ruta accedida |
| statusCode | INT | NOT NULL | Código de respuesta HTTP |
| duration | INT | NOT NULL | Duración en ms |
| userAgent | VARCHAR(500) | NULLABLE | User-Agent del cliente |
| ipAddress | VARCHAR(45) | NOT NULL | Dirección IP del cliente |
| userId | INT | NULLABLE | FK -> Users.id |
| timestamp | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Momento del acceso |

**Índices recomendados:**
- PRIMARY KEY (id)
- INDEX (timestamp)
- INDEX (userId)
- INDEX (path, method)

---

### 2.4 Entidad: **SpeciesAnalytics** (Análisis de Consultas)

**Descripción:** Estadísticas agregadas de consultas por especie.

| Campo | Tipo | Constraint | Descripción |
|-------|------|-----------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| speciesId | INT | NOT NULL, FK | FK -> Species.id |
| totalViews | INT | DEFAULT 0 | Total de consultas |
| viewsThisMonth | INT | DEFAULT 0 | Consultas este mes |
| lastViewedAt | DATETIME | NULLABLE | Última consulta |
| avgTimeSpent | INT | DEFAULT 0 | Tiempo promedio en ms |
| updatedAt | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Actualizado |

---

## 3. Relaciones Entidad-Relación

```
┌─────────────┐
│   Users     │
│  (admin)    │
└──────┬──────┘
       │ (1:N)
       │ userId (FK)
       ▼
┌─────────────────┐
│  AccessLogs     │
│ (auditoría)     │
└─────────────────┘


┌─────────────┐
│  Species    │
│ (Catálogo)  │
└──────┬──────┘
       │ (1:1)
       │ speciesId (FK)
       ▼
┌──────────────────────┐
│ SpeciesAnalytics     │
│ (Estadísticas)       │
└──────────────────────┘
```

---

## 4. Restricciones de Integridad Referencial

### 4.1 Restricción: Users → AccessLogs
```sql
ALTER TABLE AccessLogs
ADD CONSTRAINT FK_AccessLogs_Users
FOREIGN KEY (userId) REFERENCES Users(id)
ON DELETE SET NULL
ON UPDATE CASCADE;
```

### 4.2 Restricción: Species → SpeciesAnalytics
```sql
ALTER TABLE SpeciesAnalytics
ADD CONSTRAINT FK_SpeciesAnalytics_Species
FOREIGN KEY (speciesId) REFERENCES Species(id)
ON DELETE CASCADE
ON UPDATE CASCADE;
```

---

## 5. Normalización

El esquema sigue **Tercera Forma Normal (3FN)**:

- ✅ **1FN**: Todos los atributos contienen valores atómicos
- ✅ **2FN**: Todos los atributos no clave dependen completamente de la clave primaria
- ✅ **3FN**: No existen dependencias transitivas entre atributos no clave

---

## 6. Ejemplo de Datos

### Species
```json
{
  "id": 1,
  "nombre": "Jaguar",
  "nombreCientifico": "Panthera onca",
  "descripcion": "Felino de gran tamaño endémico de Chiapas...",
  "habitat": "Selva tropical",
  "dieta": "Carnívoro",
  "estado": "En Peligro de Extincion",
  "imagen": "https://zoomat.mx/images/jaguar.jpg",
  "audio": "https://zoomat.mx/audio/jaguar-es.mp3"
}
```

### Users
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@zoomat.mx",
  "password": "$2a$10$...(bcrypt hash)...",
  "role": "admin",
  "isActive": true,
  "lastLogin": "2026-05-15T14:30:00Z"
}
```

### AccessLogs
```json
{
  "id": 1,
  "method": "GET",
  "path": "/api/species/1",
  "statusCode": 200,
  "duration": 45,
  "ipAddress": "192.168.1.100",
  "userId": null,
  "timestamp": "2026-05-15T14:30:00Z"
}
```

---

## 7. Índices Recomendados para Rendimiento

```sql
-- Primary Keys
CREATE INDEX idx_species_id ON Species(id);
CREATE INDEX idx_users_id ON Users(id);
CREATE INDEX idx_accesslogs_id ON AccessLogs(id);

-- Foreign Keys
CREATE INDEX idx_accesslogs_userid ON AccessLogs(userId);
CREATE INDEX idx_analyticsspeciesid ON SpeciesAnalytics(speciesId);

-- Búsquedas frecuentes
CREATE INDEX idx_species_nombre ON Species(nombre);
CREATE INDEX idx_users_username ON Users(username);
CREATE INDEX idx_accesslogs_timestamp ON AccessLogs(timestamp);
CREATE INDEX idx_accesslogs_path ON AccessLogs(path);

-- Consultas de analytics
CREATE INDEX idx_species_dieta ON Species(dieta);
CREATE INDEX idx_species_estado ON Species(estado);
```

---

## 8. Estimaciones de Crecimiento

| Tabla | Registros/Año | Tamaño Estimado (5 años) |
|-------|--------------|----------------------|
| Species | ~50 (nuevas) | ~2 MB |
| Users | ~10 (nuevas) | ~1 MB |
| AccessLogs | ~10 millones | ~500 MB |
| SpeciesAnalytics | ~50 | ~1 MB |

---

## 9. Notas de Implementación

- La tabla `AccessLogs` crece significativamente; considerar archivado anual
- Usar `PARTITION` para `AccessLogs` por año
- Implementar índices de full-text search en `Species.descripcion`
- Usar caché (Redis) para consultas frecuentes de Species
- Implementar migraciones versionadas (Flyway/Liquibase) para cambios de esquema

---

**Última actualización:** 15 de mayo de 2026  
**Versión:** 1.0  
**Estado:** Documentado para migración a MySQL
