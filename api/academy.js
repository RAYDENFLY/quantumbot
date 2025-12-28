import mongoose from 'mongoose';
import Academy from '../models/Academy.js';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

/**
 * @swagger
 * /api/academy:
 *   get:
 *     summary: Get all academy submissions
 *     responses:
 *       200:
 *         description: List of academy
 *   post:
 *     summary: Create a new academy submission
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
 *               ratings:
 *                 type: number
 *               messageId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Academy created
 *   delete:
 *     summary: Delete an academy submission by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Academy deleted
 *       400:
 *         description: ID is required
 */
export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const academy = await Academy.find();
    res.status(200).json(academy);
  } else if (req.method === 'POST') {
    const academy = new Academy(req.body);
    await academy.save();
    res.status(201).json(academy);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    await Academy.findByIdAndDelete(id);
    res.status(200).json({ message: 'Academy deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}