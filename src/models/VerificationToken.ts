import mongoose from 'mongoose';

const verificationTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24 * 60 * 60 // 24 hours
    }
});

export default mongoose.models.VerificationToken || 
    mongoose.model('VerificationToken', verificationTokenSchema);
