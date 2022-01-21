const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userScema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    minlength: [3, "minimum user name is 3 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    unique: true,
    required: [true, "please enter a password"],
    minlength: [6, "minimum password is 6 characters"],
  },
  confirmPassword: {
    type: String,
    required: [true],
    validate: function (confirmed) {
      return confirmed === this.password;
    },
  },
});

//mongoose hook function fire before save user to db
//function to add salt and hash password using bcrypt package
userScema.pre("save", async function (next) {
  const salt = bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

//login by static method that takes email and aply findone on it to makesure existance of user then
//begin to check password by compare method provided by jwt package

userScema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth);
    if (auth) {
      return user;
    }
    throw Error("Wrong password");
  }
  throw Error("Email not found");
};

//Creating a model
const User = mongoose.model("User", userScema);

module.exports = User;
