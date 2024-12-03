import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  churchDenomination: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  interests: [{ type: String }],
  occupation: { type: String, required: true },
  about: { type: String },
  photos: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  profileCompleted: { type: Boolean, default: false }
});export default mongoose.models.User || mongoose.model('User', userSchema);