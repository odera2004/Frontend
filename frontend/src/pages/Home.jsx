import React from "react";
import carImage from "../assets/car.png";
import paintingImage from "../assets/painting.jpg";
import engineImage from "../assets/engine.jpg";
import tireImage from "../assets/tire.jpg";
import brakeImage from "../assets/brake.jpg";

function Home() {
  const services = [
    { title: "Painting", img: paintingImage, desc: "Give your car a fresh new look with our premium auto painting services." },
    { title: "Engine Maintenance", img: engineImage, desc: "Keep your car running smoothly with expert engine care." },
    { title: "Tire & Wheel Services", img: tireImage, desc: "Ensure a smooth ride with wheel alignment and tire balancing." },
    { title: "Brake Repair", img: brakeImage, desc: "Keep your car safe with professional brake inspections and repairs." },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image-container">
          <img src={carImage} alt="Car" className="hero-image" />
        </div>
        <div className="hero-text">
          <h1>Welcome Jane</h1>
          <p>
            Welcome to <strong>Auto Fix Hub</strong>, where your car gets the attention it deserves! 
            Whether it's a quick fix, a full service, or a custom upgrade, we've got you covered.
            <br /> Drive in, relax, and let us take care of the rest!
          </p>
        </div>
      </section>

      {/* Cards Section - Arranged in Two Rows */}
      <section className="cards-container">
        <div className="card-row">
          {services.slice(0, 2).map((service, index) => (
            <div key={index} className="card">
              <img src={service.img} alt={service.title} className="card-image" />
              <div className="card-text">
                <h2>{service.title}</h2>
                <p>{service.desc}</p>
                <button>Learn More</button>
              </div>
            </div>
          ))}
        </div>

        <div className="card-row">
          {services.slice(2, 4).map((service, index) => (
            <div key={index} className="card">
              <img src={service.img} alt={service.title} className="card-image" />
              <div className="card-text">
                <h2>{service.title}</h2>
                <p>{service.desc}</p>
                <button>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Garage Automation &copy; 2025</p>
      </footer>
    </div>
  );
}

export default Home;
