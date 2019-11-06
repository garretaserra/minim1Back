'use strict';
export {};

require('../models/Subject');
require('../models/Student');
let mongoose = require('mongoose');
let Subject = mongoose.model('Subject');
let Student = mongoose.model('Student');
let ObjectId = require('mongodb').ObjectID;

exports.addSubject = async function (req, res){
    let subject = req.body.subject;
    let newSubject = new Subject(subject);
    let result = await newSubject.save();
    res.status(200).send(result);
};

exports.addStudentToSubject = async function (req, res){
    let subject = req.body.subject;
    let student = await Student.findOne({name: req.body.student.name});

    let result = await Subject.updateOne({name: subject.name}, {$push:{students: ObjectId(student._id)}})
    res.status(200).send(result);
};

exports.getAllSubjects = async function (req, res){
    let subjects =await Subject.find();

    if(subjects) {
        res.status(200).json(subjects);
    } else {
        res.status(424).send({message: 'Subjects not found'});
    }
};


