import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookAppointment = () => {
  const { id } = useParams();
  const doctorName = decodeURIComponent(id);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const bookHandler = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.post(
       "https://doctor-appointment-r403.onrender.com/api/appointments/book",
        {
          doctor: doctorName,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Appointment booked successfully");
      window.location.href = "/my-appointments";
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="form-box">
      <h2>Book Appointment</h2>

      <p>
        <b>Doctor:</b> {doctorName}
      </p>

      <form onSubmit={bookHandler}>
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Select Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button className="btn btn-success" type="submit">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;