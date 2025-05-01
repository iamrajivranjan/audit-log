const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userAgent: String,
  appName: String,
  appVersion:String,
  platform: String,
  language: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
