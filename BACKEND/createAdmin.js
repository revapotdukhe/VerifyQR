require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await User.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("Admin Created Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

createAdmin();