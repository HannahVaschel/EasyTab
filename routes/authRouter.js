const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// * Signup
authRouter.post("/signup", (req, res, next) => {
    // Check if user exists
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(400)
            return next(new Error("That username is already taken"))
        }
        // Create new user
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // Create a token
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            // Send back the user object and token
            return res.status(201).send({ user: savedUser.withoutPassword(), token })
        })

    })
})


// * Login
authRouter.post("/login", (req, res, next) => {
    // Check to see if user exists
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(401)
                return next(new Error("Username or password is incorrect"))
        }
        // Check to see if password matches
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(401)
                return next(err)
            }
            if(!isMatch){
                res.status(401)
                return next(new Error("Username or password is incorrect"))
            }
            // Create Token
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            // Send back the user object and token
            return res.status(200).send({ user: user.withoutPassword(), token })
        })
    })
})

module.exports = authRouter