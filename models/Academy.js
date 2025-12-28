import mongoose from 'mongoose';

const academySchema = new mongoose.Schema({
  link: String,
  author: String,
  deskripsi: String,
  ratings: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  messageId: String,
});

export default mongoose.model('Academy', academySchema);