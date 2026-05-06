import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "https://doctor-appointment-r403.onrender.com/api/appointments"
      );

      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch appointments");
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(
        `https://doctor-appointment-r403.onrender.com/api/appointments/${id}`
      );

      fetchAppointments();
    } catch (error) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container">
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((item) => (
          <div key={item._id} className="card">
            <p><b>Doctor:</b> {item.doctor}</p>
            <p><b>Date:</b> {item.date}</p>
            <p><b>Time:</b> {item.time}</p>

            <button onClick={() => deleteHandler(item._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;