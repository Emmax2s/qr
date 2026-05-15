// Middleware de autenticación
const { verifyToken } = require('../config/auth');

/**
 * Middleware para verificar token JWT
 */
function authMiddleware(req, res, next) {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado o formato inválido',
        code: 'MISSING_TOKEN'
      });
    }

    const token = authHeader.substring(7); // Remover "Bearer "
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado',
        code: 'INVALID_TOKEN'
      });
    }

    // Adjuntar usuario al request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar autenticación',
      code: 'AUTH_ERROR'
    });
  }
}

/**
 * Middleware para logs de acceso
 */
function loggingMiddleware(req, res, next) {
  const startTime = Date.now();
  const originalSend = res.send;

  res.send = function(data) {
    const duration = Date.now() - startTime;
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.connection.remoteAddress,
      user: req.user?.username || 'anonymous'
    };

    // Guardar en memoria (en producción usar BD)
    if (!global.accessLogs) {
      global.accessLogs = [];
    }
    global.accessLogs.push(logEntry);

    // Mantener solo últimos 1000 logs
    if (global.accessLogs.length > 1000) {
      global.accessLogs = global.accessLogs.slice(-1000);
    }

    console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.path} - ${logEntry.statusCode} (${logEntry.duration})`);
    return originalSend.call(this, data);
  };

  next();
}

module.exports = {
  authMiddleware,
  loggingMiddleware
};
