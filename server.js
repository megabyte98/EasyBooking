const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const PORT = process.env.PORT || 5000
const app = express()

// connect Database
connectDB()

app.use(express.json())
app.use(cors())

// routes
app.use("/api/user", require("./routes/user"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/booking", require("./routes/booking"))
app.use("/api/hall", require("./routes/hall"))


if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
  const path = require("path")
  app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log(`Server is listening on port ${PORT}`)
  }
})
