'use strict';
import mongoose = require("mongoose");
let Phone = require('./Phone');

let student = mongoose.Schema({
    name: String,
    address: String,
    phones: [{
        description: String,
        number: String
    }]
});

module.exports = mongoose.model('Student', student);
