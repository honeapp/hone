
import connectDB from './database';

const testConnection = async () => {
  await connectDB();
  console.log('Database connection test complete');
};

testConnection();
