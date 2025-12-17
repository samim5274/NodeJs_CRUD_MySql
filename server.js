const express = require("express");
const color = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

// configure doteng
dotenv.config();

// rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

// route
app.use('/api/v1/student', require("./routes/studentsRoutes"));

app.get("/test", (req, res) => {
    res.status(200).send("<h1>Welcome my node js mysql app</h1>");
});

// post
const PORT = process.env.PORT || 8000;

// contidionaly listen
mySqlPool.query('SELECT 1').then(() => {
    // mysql 
    console.log("My Sql DB Connected".bgCyan.white);

    // listen
    app.listen(PORT, () => {
        console.log(`Server is running on port:${process.env.PORT}`.bgMagenta.white);
    });
}).catch((error) => {
    console.log(error);
});