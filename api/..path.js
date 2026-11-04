import app, { connectDB } from '../server/src/server.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Backend connection failed'
    });
  }
}