import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  contact: {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    company: { type: String, trim: true, maxlength: 100, default: '' }
  },
  service: { type: String, required: true },
  problem: { type: String, required: true, maxlength: 1200 },
  features: [{ type: String }],
  budget: { type: String, required: true },
  timeline: { type: String, required: true },
  blueprint: {
    summary: String,
    modules: [String],
    suggestedStack: [String],
    nextSteps: [String],
    complexity: String
  }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
