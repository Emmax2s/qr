import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import speciesRoutes from './routes/speciesRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

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

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use((error, _req, res, _next) => {
  const message = error instanceof Error ? error.message : 'Unexpected error';
  res.status(500).json({ message });
});
