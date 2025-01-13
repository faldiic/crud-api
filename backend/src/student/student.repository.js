const prisma = require("../db");

const findStudents = async () => {
  const students = await prisma.student.findMany();
  return students;
};

const findStudentById = async (npm) => {
  if (isNaN(npm)) {
    throw new Error("Invalid student ID: NPM must be a numberss");
  }
  
  const student = await prisma.student.findUnique({
    where: { npm: parseInt(npm) }, 
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
        where: { npm: parseInt(npm) }, 
    });
};

const editStudent = async (npm, studentData) => {
  const student = await prisma.student.update({
    where: { npm: parseInt(npm) },
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
