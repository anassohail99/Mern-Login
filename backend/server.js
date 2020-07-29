const express = require("express");
const app = express();

// db
const connectDataBase = require("./config/DB");

connectDataBase();

let PORT = process.env.PORT || 3000;

// routes

app.get("/", (req, res) => {
  res.send("Home Route");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
