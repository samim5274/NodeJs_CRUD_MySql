const express = require('express');
const { getStudent, getStudentById } = require("../controllers/StudentController");

// route object
const router = express.Router();

// routes

// GET ALL STUDENT LIST || GET
router.get('/getall', getStudent);

// GET STUDENT BY ID
router.get('/get/:id', getStudentById);

module.exports = router;