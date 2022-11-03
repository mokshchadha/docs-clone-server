const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const authRouter = express.Router();

authRouter.post("/api/login", async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;

    console.log({ name, email, profilePicture, body: req.body });

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        profilePicture,
        name,
      });
      user = await user.save();
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ user: { ...user, token }, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

authRouter.get("/api/user", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ user, token: req.token });
});

module.exports = authRouter;
