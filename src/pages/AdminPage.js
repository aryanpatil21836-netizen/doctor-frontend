import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://doctor-appointment-r403.onrender.com/api/doctors";

const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fees, setFees] = useState("");
  const [image, setImage] = useState("");

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(API);
      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      alert("Doctors fetch failed");
      setDoctors([]);
    }
  };

  const addDoctorHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API, {
        name,
        specialization,
        fees,
        image,
      });

      alert("Doctor added successfully");

      setName("");
      setSpecialization("");
      setFees("");
      setImage("");

      fetchDoctors();
    } catch (error) {
      console.log(error);
      alert("Doctor add failed");
    }
  };

  const deleteDoctorHandler = async (id) => {
    if (window.confirm("Delete doctor?")) {
      try {
        await axios.delete(`${API}/${id}`);
        alert("Doctor deleted");
        fetchDoctors();
      } catch (error) {
        console.log(error);
        alert("Delete failed");
      }
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: "25px" }}>
      <h2>Admin Panel</h2>

      <form
        onSubmit={addDoctorHandler}
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          marginBottom: "25px",
        }}
      >
        <h3>Add Doctor</h3>

        <input
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Fees"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add Doctor</button>
      </form>

      <h3>Doctor List</h3>

      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        doctors.map((doctor) => (
          <div
            key={doctor._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
            }}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              style={{ width: "120px", height: "100px", objectFit: "cover" }}
            />

            <h4>{doctor.name}</h4>
            <p>{doctor.specialization}</p>
            <p>Fees: ₹{doctor.fees}</p>

            <button onClick={() => deleteDoctorHandler(doctor._id)}>
              Delete Doctor
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;