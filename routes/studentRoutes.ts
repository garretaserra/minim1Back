import express = require('express');
let router: express.Router = express.Router();

let studentScripts = require('../controllers/studentScripts');

router.get('/get/:id', studentScripts.getStudent);
router.get('/get', studentScripts.getAllStudents);
router.post('/add', studentScripts.addStudent);
router.get('/delete/:id', studentScripts.deleteStudent);

module.exports = router;
