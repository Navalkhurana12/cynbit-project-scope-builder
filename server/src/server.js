import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import projectRoutes from './routes/projects.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.locals.demoProjects = [];
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') ?? 'http://localhost:5173' }));
app.use(express.json({ limit: '30kb' }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: 'draft-7', legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'demo-mode' }));
app.use('/api/projects', projectRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
});

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection failed:', error.message));
} else {
  console.warn('MONGO_URI not set: running in demo-memory mode. Submissions will not persist after restart.');
}

app.listen(PORT, () => console.log(`Cynbit Builder API running at http://localhost:${PORT}`));
