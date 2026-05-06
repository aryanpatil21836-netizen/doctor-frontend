import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await axios.get("https://doctor-appointment-r403.onrender.com");
    setAppointments(res.data);
  };

  const deleteHandler = async (id) => {
    await axios.delete(`https://doctor-appointment-r403.onrender.com`);
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container">
      <h2>My Appointments</h2>

      {appointments.map((item) => (
        <div key={item._id} className="card">
          <p><b>Doctor:</b> {item.doctor}</p>
          <p><b>Date:</b> {item.date}</p>
          <p><b>Time:</b> {item.time}</p>

          <button onClick={() => deleteHandler(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;