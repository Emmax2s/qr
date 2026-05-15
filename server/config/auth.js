// Configuración de autenticación JWT
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Clave secreta (en producción usar variable de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'zoomat-secret-key-2026-chiapas';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';

// Usuarios válidos (en producción usar BD)
const VALID_USERS = {
  admin: {
    username: 'admin',
    password: '$2a$10$YIvxPJzuBIKgkPvq7XjCLOLxmvvx4J8vN5c6zK9xZ8B3Y4X5W6U7', // bcrypt("admin123")
    email: 'admin@zoomat.mx',
    role: 'admin'
  }
};

/**
 * Genera un token JWT
 */
function generateToken(username) {
  return jwt.sign(
    { username, timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
}

/**
 * Verifica un token JWT
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Hash de contraseña
 */
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

/**
 * Compara contraseña con hash
 */
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  JWT_SECRET,
  JWT_EXPIRATION,
  VALID_USERS,
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword
};
