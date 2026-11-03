import { Router } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { createBlueprint } from '../utils/blueprint.js';

const router = Router();
const allowedServices = ['AI Automation', 'Web Development', 'Cloud Solutions', 'Digital Marketing'];
const schema = z.object({
  contact: z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(120),
    company: z.string().trim().max(100).optional().default('')
  }),
  service: z.enum(allowedServices),
  problem: z.string().trim().min(20).max(1200),
  features: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
  budget: z.enum(['Under ₹50,000', '₹50,000 – ₹2 lakh', '₹2 lakh – ₹5 lakh', '₹5 lakh+', 'Not sure yet']),
  timeline: z.enum(['Under 1 month', '1–3 months', '3–6 months', 'Flexible'])
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: 'Please check the form details.', errors: parsed.error.flatten() });
    const data = parsed.data;
    const blueprint = createBlueprint(data);
    const document = { ...data, blueprint };

    if (mongoose.connection.readyState === 1) {
      const saved = await Project.create(document);
      return res.status(201).json({ message: 'Project brief saved successfully.', project: { id: saved.id, ...document, createdAt: saved.createdAt }, storage: 'mongodb' });
    }
    // Local fallback keeps the prototype demonstrable before MongoDB is configured.
    const id = `DEMO-${Date.now()}`;
    req.app.locals.demoProjects.unshift({ id, ...document, createdAt: new Date().toISOString() });
    return res.status(201).json({ message: 'Project brief generated. Configure MongoDB to persist submissions.', project: { id, ...document, createdAt: new Date().toISOString() }, storage: 'demo-memory' });
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    let project;
    if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(req.params.id)) {
      project = await Project.findById(req.params.id).lean();
    } else {
      project = req.app.locals.demoProjects.find((item) => item.id === req.params.id);
    }
    if (!project) return res.status(404).json({ message: 'Project brief not found.' });
    res.json({ project });
  } catch (error) { next(error); }
});

export default router;
