import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [services, setServices] = useState([
    { title: "Painting", image: "painting.jpg", desc: "Premium auto painting services." },
    { title: "Engine Maintenance", image: "engine.jpg", desc: "Expert engine care." },
    { title: "Tire & Wheel Services", image: "tire.jpg", desc: "Alignment & balancing." },
    { title: "Brake Repair", image: "brake.jpg", desc: "Brake inspections & repairs." },
  ]);

  return (
    <div className="container my-5 py-5">
      <div className="row align-items-center text-center text-md-start py-5">
        <div className="col-md-6">
          <h1 className="fw-bold">Welcome</h1>
          <p className="lead">Your car gets the attention it deserves at <strong>Auto Fix Hub</strong>.</p>
        </div>
        <div className="col-md-6 text-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZgKLEIEpuKmp46mB-Qqjz_JX03qPeXuT3vA&s" alt="Car Service" className="img-fluid rounded shadow" />
        </div>
      </div>
      <div className="row mt-5 g-4">
        {services.map((service, index) => (
          <div key={index} className="col-md-6">
            <div className="card shadow border-0 h-100">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0lOpcjsxq4V1MWVAX4TrxL91-0idx8ifFhQ&s" alt={service.title} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="fw-bold">{service.title}</h5>
                <p>{service.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;