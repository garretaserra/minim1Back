'use strict';
import mongoose = require("mongoose");

let student = mongoose.Schema({
    name: String,
    address: String
})
