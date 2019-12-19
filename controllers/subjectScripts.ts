'use strict';
export {};

require('../models/Student');
require('../models/Subject');
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

//Get Subject from id
exports.getSubject = async function(req, res){
    let id = req.params.id.toString();
    let subject = await Subject.findOne(ObjectId(id)).populate('students');
    res.status(200).send(subject);
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

//Get all those students who are not on a subject
exports.studentsNotOnSubject = async function(req, res){
    let subjectName = req.query.subject;
    let subject = await Subject.findOne({name: subjectName}).populate('students');
    let enrolledStudents = subject.students;
    let allStudents = await Student.find();
    let resultStudents = Array();
    allStudents.forEach(student=>{
        if(enrolledStudents.filter(x=>x.name==student.name).length===0){
            resultStudents.push(student);
        }
    });
    res.status(200).send(resultStudents);
};

exports.getSubjectsFromDegree = async function (req, res) {
  let degree: string = req.query.degree;
  let subjects = await Subject.find({degree: degree}).populate('students');
  res.status(200).send(subjects);
};
