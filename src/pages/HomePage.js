import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("hhttps://doctor-appointment-r403.onrender.com");
        setDoctors(res.data);
      } catch (error) {
        alert("Doctors fetch failed");
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Book Your Doctor Appointment</h1>
        <p>Trusted healthcare, easy booking, fast appointments.</p>
      </section>

      <div className="container">
        <h2>Available Doctors</h2>

        <div className="card-grid">
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor._id}>
              <img src={doctor.image} alt={doctor.name} />

              <div className="card-body">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
                <p>
                  <b>Fees:</b> ₹{doctor.fees}
                </p>

                <Link to={`/book/${encodeURIComponent(doctor.name)}`}>
                  <button className="btn btn-primary">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;