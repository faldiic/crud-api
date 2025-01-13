const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(cors());    

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Selamat Datang di API saya");
});

const studentController = require("./student/student.controller");

app.use("/students", studentController);

app.listen(PORT, () => {
    console.log("Express API running on port: " + PORT);
});
