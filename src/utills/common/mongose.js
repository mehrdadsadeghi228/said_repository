
const mongoose = require('mongoose');
const MONGODB_URI='mongodb://root:1ghLoIcLjglaKTKEk6Kk554I@said:27017/my-app?authSource=admin'
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
