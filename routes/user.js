const express = require("express");
const user = express();
const User = require("../models/User");

user.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({ data: { userId: savedUser._id } });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ err: "Failed to create user" });
  }
});

module.exports = user;
