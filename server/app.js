import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import speciesRoutes from './routes/speciesRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

export const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requests sin origin (como mobile apps o curl requests)
      if (!origin) return callback(null, true);

      // Parsear CORS_ORIGIN que puede contener múltiples valores separados por coma
      const allowedOrigins = env.corsOrigin === '*' 
        ? ['*']
        : env.corsOrigin.split(',').map(o => o.trim());

      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use(express.json({ limit: '4mb' }));

app.get('/api/health', async (_req, res) => {
  res.json({ status: 'ok', message: 'API funcionando sin conexión a BD' });
});

app.use('/api/species', speciesRoutes);
app.use('/api/site-content', siteRoutes);
app.use('/api/admin', adminRoutes);

app.use((error, _req, res, _next) => {
  const message = error instanceof Error ? error.message : 'Unexpected error';
  res.status(500).json({ message });
});
