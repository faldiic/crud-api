const { findStudents, findStudentById, insertStudent, deleteStudent, editStudent } = require("./student.repository");

const getAllStudents = async () => {
    return await findStudents();
};

const getStudentById = async (id) => {
    const student = await findStudentById(id);
    if (!student) {
        throw Error("Student not found");
    }
    return student;
};

const createStudent = async (newStudentData) => {
    return await insertStudent(newStudentData);
};

const deleteStudentById = async (npm) => {
    await deleteStudent(npm);   
};


const editStudentById = async (id, studentData) => {
    await getStudentById(id);
    return await editStudent(id, studentData);
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudentById,
    editStudentById,
};
