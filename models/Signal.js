import mongoose from 'mongoose';

const signalSchema = new mongoose.Schema({
  author: String,
  conviction: String,
  reason: String,
  sl: String,
  tp1: String,
  tp2: String,
  tp3: String,
  status: { type: String, default: 'pending' }, // pending, approved, running, closed
  roi: Number,
  createdAt: { type: Date, default: Date.now },
  messageId: String,
});

export default mongoose.model('Signal', signalSchema);