import React from "react";
import carImage from "../assets/car.png";
import paintingImage from "../assets/painting.jpg";
import engineImage from "../assets/engine.jpg";
import tireImage from "../assets/tire.jpg";
import brakeImage from "../assets/brake.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const services = [
    { title: "Painting", img: paintingImage, desc: "Give your car a fresh new look with our premium auto painting services." },
    { title: "Engine Maintenance", img: engineImage, desc: "Keep your car running smoothly with expert engine care." },
    { title: "Tire & Wheel Services", img: tireImage, desc: "Ensure a smooth ride with wheel alignment and tire balancing." },
    { title: "Brake Repair", img: brakeImage, desc: "Keep your car safe with professional brake inspections and repairs." },
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="row align-items-center my-5">
        <div className="col-md-6 text-center">
          <img src={carImage} alt="Car" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6 text-center text-md-start">
          <h1 className="fw-bold">Welcome</h1>
          <p className="lead">
            Welcome to <strong>Auto Fix Hub</strong>, where your car gets the attention it deserves! 
            Whether it's a quick fix, a full service, or a custom upgrade, we've got you covered.
            <br /> Drive in, relax, and let us take care of the rest!
          </p>
        </div>
      </section>

      {/* Services Section - Bootstrap Cards */}
      <section className="my-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-6">
              <div className="card h-100 shadow border-0">
                <img src={service.img} alt={service.title} className="card-img-top" />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{service.title}</h5>
                  <p className="card-text">{service.desc}</p>
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">Garage Automation &copy; 2025</p>
      </footer>
    </div>
  );
}

export default Home;
