import  { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    npm: "",
    nama: "",
    kelas: "",
    alamat: "",
    no_hp: "",
    status: "",
  });

  // Mengambil data mahasiswa dari API
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Fungsi untuk menambah data mahasiswa
  const addStudent = async (student) => {
    try {
      await axios.post("http://localhost:3000/students", student);
      setModalOpen(false);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk memperbarui data mahasiswa
  const updateStudent = async (student) => {
    try {
      await axios.put(`http://localhost:3000/students/${student.npm}`, student);
      setModalOpen(false);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk menghapus data mahasiswa
  const deleteStudent = async (npm) => {
    try {
      await axios.delete(`http://localhost:3000/students/${npm}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  // Menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Menampilkan modal untuk menambah atau memperbarui data mahasiswa
  const openModal = (student = {}) => {
    setCurrentStudent(student);
    setIsEditMode(!!student.npm);
    setModalOpen(true);
  };

  // Menutup modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentStudent({
      npm: "",
      nama: "",
      kelas: "",
      alamat: "",
      no_hp: "",
      status: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-8">Data Mahasiswa</h1>

      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-6"
      >
        Tambah Mahasiswa
      </button>

      {/* Daftar mahasiswa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {students.map((student) => (
          <div
            key={student.npm}
            className="bg-white shadow-lg rounded-lg p-5"
          >
            <h2 className="text-xl font-semibold">{student.nama}</h2>
            <p>NPM: {student.npm}</p>
            <p>Kelas: {student.kelas}</p>
            <p>Alamat: {student.alamat}</p>
            <p>No HP: {student.no_hp}</p>
            <p>Status: {student.status}</p>
            <button
              onClick={() => openModal(student)}
              className="bg-yellow-500 text-white py-1 px-3 rounded-md mt-2 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteStudent(student.npm)}
              className="bg-red-500 text-white py-1 px-3 rounded-md mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditMode ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isEditMode) {
                  updateStudent(currentStudent);
                } else {
                  addStudent(currentStudent);
                }
              }}
            >
              <div className="mb-4">
                <label className="block font-medium">NPM</label>
                <input
                  type="text"
                  name="npm"
                  value={currentStudent.npm}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={currentStudent.nama}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Kelas</label>
                <input
                  type="text"
                  name="kelas"
                  value={currentStudent.kelas}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={currentStudent.alamat}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">No HP</label>
                <input
                  type="text"
                  name="no_hp"
                  value={currentStudent.no_hp}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Status</label>
                <input
                  type="text"
                  name="status"
                  value={currentStudent.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
