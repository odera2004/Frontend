import React from "react";
import carImage from "../assets/car.png";
import paintingImage from "../assets/painting.jpg";
import engineImage from "../assets/engine.jpg";
import tireImage from "../assets/tire.jpg";
import brakeImage from "../assets/brake.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const services = [
    { title: "Painting", img: paintingImage, desc: "Premium auto painting services." },
    { title: "Engine Maintenance", img: engineImage, desc: "Expert engine care." },
    { title: "Tire & Wheel Services", img: tireImage, desc: "Alignment & balancing." },
    { title: "Brake Repair", img: brakeImage, desc: "Brake inspections & repairs." },
  ];

  return (
    <div className="container my-5">
      <div className="row align-items-center text-center text-md-start">
        <div className="col-md-6">
          <h1 className="fw-bold">Welcome</h1>
          <p className="lead">Your car gets the attention it deserves at <strong>Auto Fix Hub</strong>.</p>
        </div>
        <div className="col-md-6">
          <img src={carImage} alt="Car" className="img-fluid rounded shadow" />
        </div>
      </div>
      <div className="row mt-4 g-4">
        {services.map((service, index) => (
          <div key={index} className="col-md-6">
            <div className="card shadow border-0 h-100">
              <img src={service.img} alt={service.title} className="card-img-top" />
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
