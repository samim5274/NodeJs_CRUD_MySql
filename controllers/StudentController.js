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

module.exports = {getStudent, getStudentById};