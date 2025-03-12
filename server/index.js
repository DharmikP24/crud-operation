const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user"); // ✅ Fixed import

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

// ✅ Corrected Update Route
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    id,
    { name: req.body.name, email: req.body.email, age: req.body.age }, // ✅ Fixed
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)  // ✅ Make sure "Usermodel" is correct
      .then(() => res.json({ message: "User deleted successfully" }))
      .catch((err) => res.status(500).json(err));
  }); 