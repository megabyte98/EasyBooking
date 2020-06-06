const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  endAt: { type: Date, required: true },
  startAt: { type: Date, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  hall: { type: Schema.Types.ObjectId, ref: "hall" },
  hallName: { type: String },
})

const booking = mongoose.model("booking", bookingSchema)

module.exports = booking
