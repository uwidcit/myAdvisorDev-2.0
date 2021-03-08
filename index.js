// constants for express routes, paths and db connection
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const passport = require("passport");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const multer  = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const { parse } = require('./utilities/parser');

const port = process.env.PORT || 5000;

app.post('/parseForm', upload.single('file'), async (req, res)=>{
    const { parsedText, ...data} = await parse(req.file.buffer);
    res.send(data);
  })

// JWT Configurations
require("./utilities/jwt")(passport);

// app connection and resources
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


// Enables file upload
app.use(fileUpload({
    createParentPath: true
}));

// models
const Student = require("./models/Student");
const Staff = require("./models/Staff");
const Course = require("./models/Course");
const Career = require("./models/Career");
const Transcript = require("./models/Transcript");

// routes
app.get("/", (req, res) => {
    res.status(200).send("Server running...");
});

app.use("/admin", require("./routes/admin"));

app.use("/student", require("./routes/student"));

app.use("/courses", require("./routes/courses"));

app.use("/careers", require("./routes/careers"));

app.use("/transcript", require("./routes/transcript"));

app.use("/accounts", require("./routes/authorization"));

app.listen(port, () => {
    console.log(`Server is starting on port ${port}`);
});
