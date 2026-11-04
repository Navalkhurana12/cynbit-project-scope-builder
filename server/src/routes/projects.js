
import { Router } from 'express';
import { z } from 'zod';
import { createBlueprint } from '../utils/blueprint.js';

const router = Router();

const allowedServices = [
  'AI Automation',
  'Web Development',
  'Cloud Solutions',
  'Digital Marketing'
];

const schema = z.object({
  contact: z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(120),
    company: z.string().trim().max(100).optional().default('')
  }),
  service: z.enum(allowedServices),
  problem: z.string().trim().min(20).max(1200),
  features: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
  budget: z.enum([
    'Under ₹50,000',
    '₹50,000 – ₹2 lakh',
    '₹2 lakh – ₹5 lakh',
    '₹5 lakh+',
    'Not sure yet'
  ]),
  timeline: z.enum([
    'Under 1 month',
    '1–3 months',
    '3–6 months',
    'Flexible'
  ])
});

router.post('/', (req, res) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Please check the form details.',
      errors: parsed.error.flatten()
    });
  }

  const data = parsed.data;
  const blueprint = createBlueprint(data);

  const id = `DEMO-${Date.now()}`;
  const createdAt = new Date().toISOString();

  const project = {
    id,
    ...data,
    blueprint,
    createdAt
  };

  req.app.locals.demoProjects.unshift(project);

  return res.status(201).json({
    message: 'Project brief generated successfully.',
    project,
    storage: 'demo-memory'
  });
});

router.get('/:id', (req, res) => {
  const project = req.app.locals.demoProjects.find(
    item => item.id === req.params.id
  );

  if (!project) {
    return res.status(404).json({
      message: 'Project brief not found.'
    });
  }

  return res.json({ project });
});

export default router;
