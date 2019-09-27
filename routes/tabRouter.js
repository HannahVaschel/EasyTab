const express = require('express')
const tabRouter = express.Router()
const Tab = require('../models/tab.js')


// * Get All
tabRouter.get("/", (req, res, next) => {
    Tab.find(
        { user: req.user._id }, 
        (err, tabs) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(tabs)
    })
})

// * Get One
tabRouter.get("/:_id", (req, res, next) => {
    Tab.findOne(
        { _id: req.params._id, user: req.user._id }, 
        (err, foundTab) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(foundTab)
    })
})

// * Post
tabRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newTab = new Tab(req.body)
    newTab.save((err, savedTab) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(201).send(savedTab)
    })
})

// * Delete One
tabRouter.delete("/:_id", (req, res, next) => {
    Tab.findOneAndRemove(
        { _id: req.params._id, user: req.user._id }, 
        (err, deletedTab) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(202).send(
            {
                tab: deletedTab,
                msg: `Successfully deleted ${deletedTab.title}`
            }
        )
    })
})

// * Put
tabRouter.put("/:_id", (req, res, next) => {
    Tab.findOneAndUpdate(
        { _id: req.params._id, user: req.user._id }, 
        req.body,
        { new: true },
        (err, updatedTab) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedTab)
    })
})

module.exports = tabRouter