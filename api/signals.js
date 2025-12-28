import mongoose from 'mongoose';
import Signal from '../models/Signal.js';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

/**
 * @swagger
 * /api/signals:
 *   get:
 *     summary: Get signals
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [running]
 *         description: Filter by status (optional, returns all if not specified)
 *     responses:
 *       200:
 *         description: List of signals
 *   post:
 *     summary: Create a new signal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               conviction:
 *                 type: string
 *               reason:
 *                 type: string
 *               sl:
 *                 type: string
 *               tp1:
 *                 type: string
 *               tp2:
 *                 type: string
 *               tp3:
 *                 type: string
 *               messageId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Signal created
 *   patch:
 *     summary: Update a signal
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               roi:
 *                 type: number
 *     responses:
 *       200:
 *         description: Signal updated
 *   delete:
 *     summary: Delete a signal by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Signal deleted
 *       400:
 *         description: ID is required
 */
export default async function handler(req, res) {

  if (req.method === 'GET') {
    const { status } = req.query;
    let filter = {};
    if (status === 'running') {
      filter = { status: 'running' };
    } // If no status, return all
    const signals = await Signal.find(filter);
    res.status(200).json(signals);
  } else if (req.method === 'POST') {
    const signal = new Signal(req.body);
    await signal.save();
    res.status(201).json(signal);
  } else if (req.method === 'PATCH') {
    const { id } = req.query;
    const update = req.body;
    const signal = await Signal.findByIdAndUpdate(id, update, { new: true });
    if (signal) {
      res.status(200).json(signal);
    } else {
      res.status(404).json({ error: 'Signal not found' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    await Signal.findByIdAndDelete(id);
    res.status(200).json({ message: 'Signal deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}