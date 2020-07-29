const express = require("express");
const app = express();

// db
const connectDataBase = require("./config/DB");

connectDataBase();

app.use(express.json({ extended: false }));

// routes

app.use("/api/users", require("./routes/users"));

// app.get("/", (req, res) => {
//   res.send("Home Route");
// });

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
