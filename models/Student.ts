'use strict';
import mongoose = require("mongoose");

let student = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    phones: [{
        description: String,
        number: String
    }]
});

module.exports = mongoose.model('Student', student);
