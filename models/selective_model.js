const mongoose = require('mongoose');
const blog_schema = new mongoose.Schema({
    name: {
        type: String
    },
    stdID: {
        type: String
    },
    stdCGPA: {
        type: Number
    },
    email: {
        type: String
    },
    subjects: {
        type: Array
    }
})
const blog = mongoose.model('blog', blog_schema)
module.exports = blog;