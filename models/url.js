const mongoose = require("mongoose");
const { type } = require("os");

const urlSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    longUrl: {
      type: String,
      reuqired: true,
    },
    topic: {
      type: String,
    },
    visitHistory: [
      {
        timestamp: { type: Date },
        OSDetail: { type: String },
        IP: { type: String },
        DeviceType: { type: String },
        UserAgent: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
