const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");

//DATABASE CONNECTION
dbConnect();

const app = express();

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

//SERVER

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
