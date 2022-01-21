//require express & mongoose & route
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const blogRoutes = require("./routes/bolgRoutes");
const userRoutes = require("./routes/userRoutes");
const { checkUser } = require("./middleware/authMiddleware");
const app = express();
// register view engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//middleware to give access to cookie in req so u con see cookie values instead of undefined
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/blog", () => {
  app.listen(3000, () => {
    console.log("listen to localhost 3000");
  });
});
// blog routes
app.use(express.json());
app.get("*", checkUser);
app.use("/blog", blogRoutes);
app.use("/", blogRoutes);
// user routes
app.use("/user", userRoutes);
app.use("/about", (req, res, next) => {
  res.status(200).render("about", { title: "about" });
});

app.use("*", (req, res, next) => {
  res.status(404).render("404", { title: "404" });
});
