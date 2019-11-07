import express = require('express');
let router: express.Router = express.Router();

let subjectScripts = require('../controllers/subjectScripts');

router.get('/get', subjectScripts.getAllSubjects);
router.post('/add', subjectScripts.addSubject);
router.post('/addNew', subjectScripts.addStudentToSubject);
router.get('/delete/:name', subjectScripts.deleteSubject);

module.exports = router;
