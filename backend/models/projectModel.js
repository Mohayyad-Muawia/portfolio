const mongoose = require('mongoose')

const Schema = mongoose.Schema

const porjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    technologies: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        // required: true
    },
}, { timestamps: true })

const Project = mongoose.model('Project', porjectSchema);

module.exports = Project