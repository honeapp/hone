import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: { 
        type: String, 
        required: false,
        trim: true 
    },
    fullName: { 
        type: String, 
        required: true,
        trim: true 
    },
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true,
        enum: ['male', 'female'] 
    },
    location: { 
        type: String, 
        required: true,
        trim: true 
    },
    churchDenomination: { 
        type: String, 
        required: true,
        trim: true 
    },
    maritalStatus: { 
        type: String, 
        required: true,
        enum: ['Single', 'Divorced', 'Widowed', 'Single Parent'] 
    },
    interests: [{ 
        type: String,
        trim: true 
    }],
    occupation: { 
        type: String, 
        required: true,
        trim: true 
    },
    about: { 
        type: String,
        trim: true,
        maxlength: 500 
    },
    photos: [{ 
        type: String,
        trim: true 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now,
        immutable: true 
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationExpires: {
        type: Date,
        default: () => new Date(+new Date() + 24 * 60 * 60 * 1000)
    },
    profileCompleted: { 
        type: Boolean, 
        default: false 
    },
    provider: {
        type: String,
        enum: ['credentials', 'google', 'facebook'],
        default: 'credentials'
    },
    providerId: {
        type: String,
        sparse: true
    },
    password: {
        type: String,
        required: function() {
            return this.provider === 'credentials';
        }
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
