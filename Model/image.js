const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    path: {
        type : String
    },
    url: {
        type : String
    },
    size: {
        type : String
    }
}) 

module.exports = mongoose.model('ipfs', imageSchema)