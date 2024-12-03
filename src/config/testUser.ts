
import connectDB from './database';
import User from '../models/User';

const testUser = async () => {
  await connectDB();

  const newUser = new User({
    email: "test@example.com",
    password: "test123",
    phoneNumber: "+1234567890",
    fullName: "Test User",
    dateOfBirth: new Date('1990-01-01'),
    gender: "Male",
    location: {
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria"
    },
    churchDetails: {
      denomination: "Catholic",
      religiousActivityLevel: "Active"
    },
    interests: ["Reading", "Music", "Technology"],
    personalityTraits: {
      introvertExtrovertScale: 7,
      socialStyle: "Balanced"
    }
  });

  try {
    const savedUser = await newUser.save();
    console.log('✅ Test user created successfully:', savedUser.email);
  } catch (error) {
    console.log('❌ Error creating test user:', error);
  }
};

testUser();
