const mongoose = require("mongoose")

const Schema = mongoose.Schema

const hallSchema = new Schema({
  hallName: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  projector: { type: Boolean, default: false },
  WhiteBoard: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  bookings: [
    {
      booking: { type: mongoose.Schema.Types.ObjectId, ref: "booking" },
      startAt: Date,
      endAt: Date,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      firstName: String,
      lastName: String,
    },
  ],
})

module.exports = mongoose.model("hall", hallSchema)
