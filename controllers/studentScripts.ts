'use strict';
export {};

require('../models/Student');
let mongoose = require('mongoose');
let Student = mongoose.model('Student');
let ObjectId = require('mongodb').ObjectID;

exports.addStudent = async function (req, res){
    let student = req.body.student;
    let newStudent = new Student(student);
    let result = await newStudent.save();
    if(result){
        res.status(200).send(result);
    }
    else{
        res.status(400).send(result);
    }
};

exports.getStudent = async function (req, res){
    let s = req.query.id;
    let student = await Student.findOne({_id: s});
    if(student) {
        res.status(200).json(student);
    } else {
        res.status(424).send({message: 'Student not found'});
    }
};
