// Rutas de autenticación
const express = require('express');
const router = express.Router();
const { generateToken, comparePassword, VALID_USERS } = require('../config/auth');

/**
 * POST /auth/login
 * @description Autentica usuario y retorna JWT token
 * @body {username, password}
 * @returns {token, user, expiresIn}
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar entrada
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña requeridos',
        code: 'MISSING_CREDENTIALS'
      });
    }

    // Verificar usuario existe
    const user = VALID_USERS[username];
    if (!user) {
      console.warn(`[AUTH] Intento de login fallido: usuario no existe (${username})`);
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Verificar contraseña
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      console.warn(`[AUTH] Intento de login fallido: contraseña incorrecta (${username})`);
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generar token
    const token = generateToken(username);

    console.log(`[AUTH] Login exitoso: ${username}`);

    res.json({
      success: true,
      message: 'Autenticación exitosa',
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      },
      expiresIn: '24h'
    });
  } catch (error) {
    console.error('[AUTH] Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar login',
      code: 'AUTH_ERROR'
    });
  }
});

/**
 * GET /auth/verify
 * @description Verifica si token es válido
 * @headers {Authorization: Bearer <token>}
 * @returns {valid: boolean, user: object}
 */
router.get('/verify', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({ valid: false });
    }

    const token = authHeader.substring(7);
    const { verifyToken } = require('../config/auth');
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      user: decoded
    });
  } catch (error) {
    res.json({ valid: false });
  }
});

/**
 * POST /auth/logout
 * @description Cierra sesión (cliente elimina token)
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Sesión cerrada correctamente'
  });
});

module.exports = router;
