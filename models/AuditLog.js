const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  action: String,
  value: String,
  timeStamp:Number,
  sequence: Number,
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AuditLog', userSchema);
