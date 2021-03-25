const express = require("express")
const cors = require("cors")
//routes:
const locationRoutes = require("./routes/locationroutes")

//middleware:
const app = express()
app.use(cors())
app.use(express.json())

//endpoints:
app.use("/city", locationRoutes)


//ERROR HANDLING:
app.use((req, res, next) => {
  let error = new Error("no matching routes found")
  error.status = 404
  next(error)
})

//UNIVERSAL ERROR HANDLING:
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({ success: false, message: err.message })
})


app.listen(4000,() => console.log("server is running"))


