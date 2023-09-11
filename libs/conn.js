const mongoose = require("mongoose");
const connectDB = async () => {
  // mongodb://127.0.0.1:27017/Crud13
  // mongodb+srv://ragul8523947145:ragulhp2704@crud.q6zjhg8.mongodb.net/Crud?retryWrites=true&w=majority
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Crud13");
  } catch (err) {
    console.log(err,"werhuierwh");
  }
};

export default connectDB;
