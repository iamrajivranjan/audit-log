const express = require("express");
const app = express();
const userRoutes = require("./user");
const auditRoutes = require("./auditLog");

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use("/users", userRoutes);
app.use("/audits", auditRoutes);

module.exports = app;
