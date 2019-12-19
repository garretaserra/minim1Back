import express = require('express');
let router: express.Router = express.Router();

let subjectScripts = require('../controllers/subjectScripts');

router.get('/get', subjectScripts.getAllSubjects);
router.get('/getFromId/:id', subjectScripts.getSubject);
router.post('/add', subjectScripts.addSubject);
router.post('/addNew', subjectScripts.addStudentToSubject);
router.get('/delete/:name', subjectScripts.deleteSubject);
router.get('/dropSubject', subjectScripts.dropSubject);
router.get('/studentsNotEnrolled', subjectScripts.studentsNotOnSubject);
router.get('/getByDegree', subjectScripts.getSubjectsFromDegree);

module.exports = router;
