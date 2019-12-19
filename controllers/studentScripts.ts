'use strict';
export {};

require('../models/Student');
require('mongodb').ObjectID;
let mongoose = require('mongoose');
let Student = mongoose.model('Student');
let ObjectId = require('mongodb').ObjectID;

//Add a new Student
exports.addStudent = async function (req, res){
    let student;
    if(req.body.student)
         student = req.body.student;
    else
        res.status(400).send('No student object found');
    let newStudent = new Student(student);
    let result = await newStudent.save();
    if(result){
        res.status(200).send(result);
    }
    else{
        res.status(400).send(result);
    }
};

//Get a single Student with their ID
exports.getStudent = async function (req, res){
    let id = req.params.id.toString();
    let student = await Student.findOne(ObjectId(id));
    if(student) {
        res.status(200).json(student);
    } else {
        res.status(424).send({message: 'Student not found'});
    }
};

//Get all students
exports.getAllStudents = async function (req, res) {
    let students = await Student.find();
    res.status(200).json(students);
};

//Delete single student with their ID
exports.deleteStudent = async function (req, res) {
    let id = req.params.id.toString();
    let student = Student.findOne(ObjectId(id));
    if(student){
        student.remove();
        res.status(200).send({message: 'user deleted'});
    }
    else{
        res.status(400).send({error: 'student could not be deleted because it was not found'});
    }
};
