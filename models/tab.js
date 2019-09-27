const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tabSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: String,
    url: {
        type: String,
        required: true
    },
    notes: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Tab", tabSchema)  