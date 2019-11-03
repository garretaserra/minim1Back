'use strict';
export {};

require('../models/Subject');
let mongoose = require('mongoose');
let Subject = mongoose.model('Subject');
let ObjectId = require('mongodb').ObjectID;

exports.addSubject = async function (req, res){
    let subject = req.body.student;
    let newStudent = new Subject(subject);
    await newStudent.save();
};

exports.addStudentToSubject = async function (req, res){
    let subject = req.body.subject;
    let student = req.bosy.student;

    let result = await Subject.updateOne({_id: subject._id}, {$push:{students: student}})
};

exports.getAllSubjects = async function (req, res){
    let subjects =await Subject.find();

    if(subjects) {
        res.status(200).json(subjects);
    } else {
        res.status(424).send({message: 'Subjects not found'});
    }
};


