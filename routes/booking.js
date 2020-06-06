const express = require("express")
const moment = require("moment")
const Booking = require("../models/Booking")
const { check, validationResult } = require("express-validator")
const auth = require("../middleware/auth")
const User = require("../models/User")
const Hall = require("../models/Hall")
const router = express.Router()

// to create a booking
router.post(
  "/:hall_id",
  [
    auth,
    [
      check("startAt", "Starting Date of Booking is required").not().isEmpty(),
      check("endAt", "Ending Date of Booking is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      if (req.body.startAt < req.body.endAt) {
        const user = await User.findById(req.user.id).select("-password")
        const hall = await Hall.findById(req.params.hall_id).populate(
          "bookings"
        )
        const bookingFields = {
          startAt: req.body.startAt,
          endAt: req.body.endAt,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          user: req.user.id,
          hall: req.params.hall_id,
          hallName: hall.hallName,
        }

        const newBooking = new Booking(bookingFields)
        if (validBooking(hall, newBooking)) {
          hall.bookings.push(newBooking)
          await newBooking.save()
          await hall.save()
          res.status(200).json(newBooking)
        } else {
          return res.status(404).json({
            errors: [
              { title: "Invalid Booking", msg: "Booking already exists" },
            ],
          })
        }
      } else {
        return res.status(404).json({
          errors: [
            { title: "Invalid Booking", msg: "PLease input Valid dates" },
          ],
        })
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

// to get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.json(bookings)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// to get current users bookings
router.get("/mybookings", auth, async (req, res) => {
  try {
    const myBookings = await Booking.find({ user: req.user.id })
    if (myBookings.length === 0) {
      return res.status(404).json({ msg: "Bookings Not Found" })
    }
    res.status(200).json(myBookings)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

router.delete("/:hall_id/:booking_id", auth, async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.hall_id)
    await Booking.findByIdAndDelete({ _id: req.params.booking_id })
    const deleteBooking = hall.bookings.find(
      (booking) => booking.id === req.params.booking_id
    )
    if (!deleteBooking) {
      return res.status(404).json({ msg: "Booking Does not exist" })
    }
    if (deleteBooking.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ msg: "User not authorized to delete booking" })
    }
    console.log(deleteBooking)
    const removeIndex = hall.bookings
      .map((booking) => booking.id.toString())
      .indexOf(deleteBooking)
    hall.bookings.splice(removeIndex, 1)
    console.log(hall.bookings)
    await hall.save()
    res.status(200).json({ msg: "Booking has been removed" })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send("Server Error")
  }
})

const validBooking = (hall, proposedBooking) => {
  let isValid = true
  if (hall.bookings && hall.bookings.length > 0) {
    isValid = hall.bookings.every(function (booking) {
      const proposedStart = moment(proposedBooking.startAt)
      const proposedEnd = moment(proposedBooking.endAt)

      const actualStart = moment(booking.startAt)
      const actualEnd = moment(booking.endAt)

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      )
    })
  }

  return isValid
}

module.exports = router
