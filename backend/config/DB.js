const mongoose = require("mongoose");
const { MONGO_URI } = require("./default.json");

const connectDataBase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useCreateIndex: true, // create index on every data that we pass to the debug
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB connection established");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDataBase;
