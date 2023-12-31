const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sakdffjewofjwe";

const MONGODB =
  "mongodb+srv://mankars081:7777778787@cluster0.pzw7xqe.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log(`Server started at http://localhost:${5000}`);
});

app.post("/post", async (req, res) => {
  console.log(req);
});

const User = require("./userDetails");

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({ error: "User dosent exist with that email" });
  }
  const doMatch = await bcrypt.compare(password, user.password);
  if (!doMatch) {
    return res.json({ error: "email or password invalid" });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET);

  if (res.status(201)) {
    return res.json({ status: "ok", data: token, userType: user.userType });
  } else {
    return res.json({ error: "error" });
  }
});

app.post("/admin", async (req, res) => {
  try {
    const user = await User.find({});
    res.send({ status: "ok", userdetail: user });
  } catch (error) {
    res.send({ status: "error" });
  }
});
