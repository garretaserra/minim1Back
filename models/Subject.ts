'use strict';
import mongoose = require("mongoose");

let subject =mongoose.Schema({
    name: String,
    students: []
});

module.exports = mongoose.model('Subject', subject);
