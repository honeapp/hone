import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema({
    reading: Boolean,
    traveling: Boolean,
    music: Boolean,
    sports: Boolean,
    cooking: Boolean,
    art: Boolean,
    movies: Boolean,
    fitness: Boolean,
    photography: Boolean,
    technology: Boolean,
    nature: Boolean,
    communityService: Boolean,
    fashion: Boolean,
    learning: Boolean,
    business: Boolean,
    politics: Boolean
});

const userSchema = new mongoose.Schema({
    // Basic Account
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    
    // Church Details
    denomination: { type: String, required: true },
    religiousActivityLevel: { 
        type: String, 
        enum: ['Very Active', 'Active', 'Casual'],
        required: true 
    },

    // Personal Info
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    height: { type: Number },
    educationLevel: { type: String },
    occupation: { type: String },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Divorced', 'Widowed', 'Single Parent'],
        required: true
    },

    // Interests & Personality
    interests: interestSchema,
    personalityTraits: {
        introvertExtrovert: { type: Number }, // Scale 1-10
        communicationStyle: { type: String },
        lifeGoals: [String],
        values: [String],
        socialStyle: {
            type: String,
            enum: ['Outgoing', 'Reserved', 'Balanced']
        }
    },

    // Profile
    aboutMe: { type: String },
    profilePicture: { type: String },
    additionalPhotos: [String],

    // Preferences
    drinking: { type: Boolean },
    smoking: { type: Boolean },
    ageRangeInterest: {
        min: { type: Number },
        max: { type: Number }
    },
    locationPreference: { type: String },

    // Account Status
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    accountType: { 
        type: String, 
        enum: ['Free', 'Premium'],
        default: 'Free'
    },
    accountStatus: { 
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    joinDate: { type: Date, default: Date.now },
    lastActive: { type: Date },

    // Social Login
    googleId: { type: String },
    facebookId: { type: String }
});

export default mongoose.models.HoecUser || mongoose.model('HoecUser', userSchema);
