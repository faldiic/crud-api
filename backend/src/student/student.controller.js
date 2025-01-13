const express = require("express");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudentById,
  editStudentById,
} = require("./student.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).send(students); // 200 OK
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to fetch students", error: err.message }); // 500 Internal Server Error
  }
});

router.get("/:npm", async (req, res) => {
  try {
    const studentId = parseInt(req.params.npm);
    const student = await getStudentById(studentId);

    if (!student) {
      return res.status(404).send({ message: "Student not found" }); // 404 Not Found
    }

    res.status(200).send(student); // 200 OK
  } catch (err) {
    res.status(400).send({ message: "Invalid student ID", error: err.message }); // 400 Bad Request
  }
});

router.post("/", async (req, res) => {
  try {
    const newStudentData = req.body;
    const student = await createStudent(newStudentData);

    res.status(201).send({
      data: student,
      message: "Student created successfully", // 201 Created
    });
  } catch (err) {
    res
      .status(400)
      .send({ message: "Failed to create student", error: err.message }); // 400 Bad Request
  }
});

router.delete("/:npm", async (req, res) => {
    try {
      const studentNpm = req.params.npm; 
  
      await deleteStudentById(studentNpm); 
  
      res.status(200).send({ message: "Student deleted successfully" }); // 200 OK
    } catch (err) {
      if (err.message === "Student not found") {
        return res.status(404).send({ message: "Student not found" }); // 404 Not Found
      }
      res.status(400).send({ message: "Invalid student NPM", error: err.message }); // 400 Bad Request
    }
  });
  

router.put("/:npm", async (req, res) => {
  try {
    const studentId = req.params.npm;
    const studentData = req.body;

    const student = await editStudentById(studentId, studentData);
    if (!student) {
      return res.status(404).send({ message: "Student not found" }); // 404 Not Found
    }

    res.status(200).send({
      data: student,
      message: "Student updated successfully", // 200 OK
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to update student", error: err.message }); // 500 Internal Server Error
  }
});

module.exports = router;
