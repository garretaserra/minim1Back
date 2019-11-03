'use strict';
import mongoose = require("mongoose");

let phone = mongoose.Schema({
    description: String,
    number: String
});

module.exports = mongoose.model('Phone', phone);
