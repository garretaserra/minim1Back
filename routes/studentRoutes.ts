import express = require('express');
let router: express.Router = express.Router();

let studentScripts = require('../controllers/studentScripts');

router.get('/get', studentScripts.getStudent);
router.post('/add', studentScripts.addStudent);

module.exports = router;
