import mongoose from 'mongoose';
import Research from '../models/Research.js';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

/**
 * @swagger
 * /api/research:
 *   get:
 *     summary: Get all research submissions
 *     responses:
 *       200:
 *         description: List of research
 *   post:
 *     summary: Create a new research submission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *               author:
 *                 type: string
 *               messageId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Research created
 *   delete:
 *     summary: Delete a research submission by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Research deleted
 *       400:
 *         description: ID is required
 */
export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const research = await Research.find();
    res.status(200).json(research);
  } else if (req.method === 'POST') {
    const research = new Research(req.body);
    await research.save();
    res.status(201).json(research);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    await Research.findByIdAndDelete(id);
    res.status(200).json({ message: 'Research deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}