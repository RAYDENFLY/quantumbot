import mongoose from 'mongoose';

const researchSchema = new mongoose.Schema({
  link: String,
  author: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  messageId: String,
});

export default mongoose.model('Research', researchSchema);