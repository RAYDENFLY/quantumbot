import mongoose from 'mongoose';

const learningSchema = new mongoose.Schema({
  link: String,
  author: String,
  deskripsi: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  messageId: String,
});

export default mongoose.model('Learning', learningSchema);