const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const PORT = process.env.PORT || 7000


// * Middleware for every request
app.use(morgan('dev'))
app.use(express.json())

// * DB Connection
mongoose.connect("mongodb://localhost:27017/guitar-practice-space",
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => console.log("Connected to the DB"))


// * Routes
app.use("/api", expressJwt({ secret: process.env.SECRET }))
app.use("/auth", require('./routes/authRouter.js'))
app.use("/api/saved", require('./routes/tabRouter.js'))


// * Global Error Handling
app.use((err, req, res, next) => {
    console.error(err)
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

// * Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})