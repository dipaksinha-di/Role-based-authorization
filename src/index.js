const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");

//DATABASE CONNECTION
dbConnect();

const app = express();

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
  res.send("Role Based Authorization");
});

//SERVER

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
