'use strict';
export {};

require('../models/Subject');
require('../models/Student');
let mongoose = require('mongoose');
let Subject = mongoose.model('Subject');
let Student = mongoose.model('Student');
let ObjectId = require('mongodb').ObjectID;

//Add a subject
exports.addSubject = async function (req, res){
    let subject = req.body.subject;
    let newSubject = new Subject(subject);
    let result = await newSubject.save();
    res.status(200).send(result);
};

//Enroll student into a subject
exports.addStudentToSubject = async function (req, res){
    let subject = req.body.subject;
    //Find student object to get the ID from name
    let student = await Student.findOne({name: req.body.student.name});
    //Add the student ObjectID to the array of students of the subject
    let result = await Subject.updateOne({name: subject.name}, {$push:{students: ObjectId(student._id)}})
    res.status(200).send(result);
};

//Get all subjects with data for their students populated
exports.getAllSubjects = async function (req, res){
    let subjects =await Subject.find()
    .populate('students');
    if(subjects) {
        res.status(200).json(subjects);
    } else {
        res.status(424).send({message: 'Subjects not found'});
    }
};

//Delete a subject
exports.deleteSubject = async function(req, res){
  let name = req.params.name;
  let result = await Subject.deleteOne({name: name});
  res.status(200).send(result);
};

//Remove a student from the identified subject they are currently enrolled in
exports.dropSubject = async function (req, res) {
    let studentName = req.query.student;
    let subjectName = req.query.subject;
    let student = await Student.findOne({name: studentName});
    let result = await Subject.updateOne({name: subjectName}, {$pull: {students: ObjectId(student._id)}});
    res.status(200).send(result);
};
