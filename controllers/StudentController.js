const db = require("../config/db");

// GET ALL STUDENT LIST
const getStudent  = async(req, res) => {
    try {
        const data = await db.query(` SELECT * FROM students`);
        if(!data){
            return res.status(404).send({
                seccess: false,
                message: 'No Records found.'
            });
        }
        res.status(200).send({
            success: true,
            message: 'All student Records',
            total: data[0].length,
            data: data[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error is GET all student API.',
            error
        });
    }
};

// GET STUDENT BY ID
const getStudentById =  async(req, res) => {
    try {
        const std_id = req.params.id;
        if(!std_id){
            return res.status(404).send({
                success: false,
                message: 'Invalid or Provide student id'
            });
        }
        // const data = await db.query(` SELECT * FROM 'students' WHERE id =`+std_id);
        const data = await db.query(` SELECT * FROM students WHERE id =?`,[
            std_id,
        ]);
        if(!std_id){
            return res.status(404).send({
                success: false,
                message: 'No records found.'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Student found successfully',
            studentDetails: data[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in GET student by id API',
            error
        });
    }
};

// CREATE NEW STUENT method POST

const createStudent = async(req, res) => {
    try {
        const {name, roll_no, class_name, medium, fees} = req.body;
        if(!name || !roll_no || !class_name || !medium || !fees){
            return res.status(500).send({
                success:false,
                message: 'Please provide all fields.'
            });
        }

        const data = await db.query(`
            INSERT INTO students (name, roll_no, class_name, medium, fees) VALUES (?,?,?,?,?)`, 
            [name, roll_no, class_name, medium, fees]
        );
        if(!data){
            return res.status(400).send({
                success:false,
                message: 'Error In INSERT QUERY.'
            });
        }

        res.status(200).send({
            success: true,
            message: 'New Reacords create successfully.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in CREATE student API',
            error
        });
    }
};

// UPDATE STUDENT DATA

const updateStd = async (req, res) => {
    try {
        const std_id = req.params.id;
        if(!std_id){
            return res.status(400).send({
                success:false,
                message: 'Invalid or missing student id.'
            });
        }

        const {name, roll_no, class_name, medium, fees} = req.body;

        if(!name || !roll_no || !class_name || !medium || !fees){
            return res.status(400).send({
                success:false,
                message: 'Please provide all fields.'
            });
        }

        const data = await db.query(`UPDATE students SET name = ?, roll_no = ?, class_name = ?, medium = ?, fees = ? WHERE id=?`,
            [name, roll_no, class_name, medium, fees, std_id]
        );

        if(!data){
            return res.status(400).send({
                success:false,
                message: "Error in UPDATE data",
            });
        }
        const student = await db.query(` SELECT * FROM students WHERE id =?`,[
            std_id,
        ]);
        res.status(200).send({
            success:true,
            message: 'Student details data updated.',
            student: student[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in UPDATE student API',
            error
        });
    }
};

// DELETE STUDENT DATA BY ID

const deleteStd = async (req, res) => {
    try {
        const std_id = req.params.id;
        if(!std_id){
            return res.status(404).send({
                success: false,
                message: 'Invalid or missing student id'
            });
        }
        const data = await db.query(`DELETE FROM students WHERE id = ?`, [std_id]);
        if (result.affectedRows === 0) {
        return res.status(404).send({
            success: false,
            message: 'Student not found'
        });
        }
        res.status(200).send({
            success: true,
            message: 'Student DELETE successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in GET student by id API',
        });
    }
};

module.exports = {
    getStudent,
    getStudentById, 
    createStudent, 
    updateStd, 
    deleteStd
};