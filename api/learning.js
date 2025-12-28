import mongoose from 'mongoose';
import Learning from '../models/Learning.js';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

/**
 * @swagger
 * /api/learning:
 *   get:
 *     summary: Get all learning submissions
 *     responses:
 *       200:
 *         description: List of learning
 *   post:
 *     summary: Create a new learning submission
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
 *               deskripsi:
 *                 type: string
 *               messageId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Learning created
 *   delete:
 *     summary: Delete a learning submission by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Learning deleted
 *       400:
 *         description: ID is required
 */
export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const learning = await Learning.find();
    res.status(200).json(learning);
  } else if (req.method === 'POST') {
    const learning = new Learning(req.body);
    await learning.save();
    res.status(201).json(learning);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    await Learning.findByIdAndDelete(id);
    res.status(200).json({ message: 'Learning deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}