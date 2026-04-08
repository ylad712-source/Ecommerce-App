const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/e-commerce";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongo;
