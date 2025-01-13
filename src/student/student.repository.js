const prisma = require("../db");

const findStudents = async () => {  
    const students = await prisma.student.findMany();
    return students;
};

const findStudentById = async (id) => {
    if (isNaN(id)) {
        throw new Error("Invalid student ID: ID must be a number");
    }

    const student = await prisma.student.findUnique({
        where: { id: parseInt(id) }, 
    });

    return student;
};


const insertStudent = async (studentData) => {
    const student = await prisma.student.create({
        data: {
            npm: studentData.npm,
            nama: studentData.nama,
            kelas: studentData.kelas,
            alamat: studentData.alamat,
            no_hp: studentData.no_hp,
            status: studentData.status,
        },
    });
    return student;
};

const deleteStudent = async (npm) => {

    await prisma.student.delete({
        where: parseInt(npm), 
    });
};

const editStudent = async (id, studentData) => {
    const student = await prisma.student.update({
        where: { id: parseInt(id) },
        data: {
            npm: studentData.npm,
            nama: studentData.nama,
            kelas: studentData.kelas,
            alamat: studentData.alamat,
            no_hp: studentData.no_hp,
            status: studentData.status,
        },
    });
    return student;
};

module.exports = {
    findStudents,
    findStudentById,
    insertStudent,
    deleteStudent,
    editStudent,
};
