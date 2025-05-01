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
    const query = req.query;
    let logs = [];
    if (query.userId) {
      logs = await AuditLog.find({ userId: query.userId }).sort({
        timeStamp: 1,
        sequence: 1,
      });
    } else {
      logs = await AuditLog.find().sort({ timeStamp: 1, sequence: 1 });
    }

    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({ error: "Failed to retrieve audit logs" });
  }
});

auditLog.delete("/clear", async (req, res) => {
  try {
    const query = req.query;
    console.log(JSON.stringify(query));
    if (query.key === process.env.DELETE_KEY) {
      await AuditLog.deleteMany({});
      res.status(200).json({ message: "All audit logs deleted" });
    } else {
      return res
        .status(401)
        .json({ err: "Error: Unauthorized to perform the action" });
    }
  } catch (error) {
    console.error("Error deleting audit logs:", error);
    res.status(500).json({ error: "Failed to delete audit logs" });
  }
});

module.exports = auditLog;
