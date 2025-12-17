const express = require('express');
const { getStudent, getStudentById, createStudent, updateStd, deleteStd } = require("../controllers/StudentController");

// route object
const router = express.Router();

// routes

// GET ALL STUDENT LIST || GET
router.get('/getall', getStudent);

// GET STUDENT BY ID
router.get('/get/:id', getStudentById);

// CREATE NEW STUENT
router.post('/create', createStudent);

// UPDATE STUDENT DATA
router.put('/update/:id', updateStd);

// DELETE STUDENT DATA
router.delete('/delete/:id', deleteStd);

module.exports = router;