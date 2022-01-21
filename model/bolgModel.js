const mongoose = require("mongoose");
const { stringify } = require("querystring");
const User = require("./userModel");

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  tages: {
    type: String,
  },
  auther: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creationDate: { type: Date, default: Date.now },
});

//Creating a model
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
