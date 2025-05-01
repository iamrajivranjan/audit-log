const express = require("express");
const auditLog = express();
const AuditLog = require("../models/AuditLog");

// Save audit log
auditLog.post("/log", async (req, res) => {
  try {
    const log = new AuditLog(req.body);
    await log.save();
    res.status(201).json({ message: "Audit log saved" });
  } catch (error) {
    console.error("Error saving audit log:", error);
    res.status(500).json({ error: "Failed to save audit log" });
  }
});

// Get all audit logs sorted by timestamp and sequence
auditLog.get("/list", async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ timeStamp: 1, sequence: 1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({ error: "Failed to retrieve audit logs" });
  }
});

module.exports = auditLog;
