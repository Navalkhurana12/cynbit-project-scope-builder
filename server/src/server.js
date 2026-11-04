
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import projectRoutes from './routes/projects.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.locals.demoProjects = [];

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(',').map(url => url.trim())
    : 'http://localhost:5173'
}));

app.use(express.json({ limit: '30kb' }));

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false
}));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: 'not-required',
    storage: 'demo-memory'
  });
});

app.use('/api/projects', projectRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    message: 'Something went wrong. Please try again.'
  });
});

// Local development only
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Cynbit Builder API running at http://localhost:${PORT}`);
  });
}

export default app;
