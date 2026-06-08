const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    console.log(process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectToMongo;