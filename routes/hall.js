const express = require("express")
const Hall = require("../models/Hall")
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator")
const router = express.Router()

// route to create hall
router.post(
  "/",
  [check("hallName", "Hall Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      hallName,
      image,
      description,
      capacity,
      projector,
      whiteBoard,
    } = req.body
    const hallFields = {}
    hallFields.hallName = hallName
    if (image) hallFields.image = image
    if (description) hallFields.description = description
    if (capacity) hallFields.capacity = capacity
    if (projector) hallFields.projector = projector
    if (whiteBoard) hallFields.whiteBoard = whiteBoard
    try {
      let hall = await Hall.findOne({ hallName })
      if (hall) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Hall already exists" }] })
      }
      hall = new Hall(hallFields)
      await hall.save()
      res.status(200).json(hall)
    } catch (err) {
      console.error(err.response.data)
      res.status(500).send("Server Error")
    }
  }
)
// route to get all halls
router.get("/", async (req, res) => {
  try {
    const halls = await Hall.find()
    res.json(halls)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// route to get particular hall
router.get("/:hall_id", auth, async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.hall_id).populate("booking", [
      "startAt",
      "endAt",
      "user",
    ])
    if (!hall) {
      return res.status(400).json({ msg: "Hall not found" })
    }
    res.status(200).json(hall)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
