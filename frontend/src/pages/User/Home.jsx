import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid px-0"
      style={{
        paddingTop: "20px",
        background: "rgba(169, 169, 169, 0.7)", 
      }}
    >
      {/* Hero Section */}
      <section className="row align-items-center my-5">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGgarpR8J2lHyOsfNYSb-sRcmCkFJuqQAqw&s"
            alt="Car"
            className="img-fluid rounded shadow hero-image"
            style={{
              maxWidth: "190%",
              width: "800px",
              height: "auto",
              zIndex: 1, 
            }}
          />
        </div>
        <div className="col-md-6 text-center text-md-start" style={{ zIndex: 2 }}>
          <h1
            className="fw-bold mb-4"
            style={{ fontSize: "2.5rem", color: "#333" }}
          >
            Welcome!!!
          </h1>
          <p
  className="lead"
  style={{
    fontSize: "1.5rem", 
    lineHeight: "1.8",  
    fontWeight: "bold",
    color: "#222", 
  }}
>
Welcome to <strong>Auto Fix Hub</strong>, where your car gets the care it deserves! We know your vehicle is more than just transportation—it’s your daily companion. That’s why we offer top-quality services, from quick fixes and full-service check-ups to custom upgrades, ensuring your car runs smoothly and efficiently.

Our expert team uses the latest technology and premium parts to handle everything from routine maintenance to complex repairs. Just drive in, relax, and let us do the rest.

At <strong>Auto Fix Hub</strong>, we make car care simple, reliable, and hassle-free! 🚗💨
</p>

        </div>
        
      </section>
      <div className="text-center mt-5">
  <button 
    className="btn btn-dark btn-lg" 
    style={{
      transition: "background 0.3s ease",
      marginTop: "50px",  
      padding: "12px 24px", 
    }}
    onMouseEnter={(e) => e.target.style.background = "#333"}
    onMouseLeave={(e) => e.target.style.background = "#000"}
    onClick={() => navigate('/book')}
  >
    Book Now
  </button>
    </div>
      {/* Why Choose Us */}
      <section className="text-center my-5">
        <h2 className="fw-bold mb-4">Why Choose Us?</h2>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <img
                src="https://media.istockphoto.com/id/1317137029/photo/man-greeting-a-mechanic-with-a-handshake-at-an-auto-repair-shop.jpg?s=612x612&w=0&k=20&c=KnlTKOS8DdDQiFifRGSaBwFrTMNXhOuVV7LJuiB-I9U="
                alt="Trusted Experts"
                className="mb-2"
              />
              <h5 className="fw-bold">Trusted Experts</h5>
              <p>Experienced mechanics and technicians</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <img
                src="https://media.istockphoto.com/id/1387759698/photo/hand-of-car-mechanic-with-wrench-auto-repair-garage-mechanic-works-on-the-engine-of-the-car.jpg?s=612x612&w=0&k=20&c=JVYyKMvP-NN-bTMyIF-pNrifwvjyjKcIRjTVEmSmPsM="
                alt="Affordable Prices"
                className="mb-2"
              />
              <h5 className="fw-bold">Affordable Prices</h5>
              <p>Quality service at fair prices</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <img
                src="https://media.istockphoto.com/id/105942216/photo/an-auto-repair-shop-with-focus-of-a-woman-on-the-phone.jpg?s=612x612&w=0&k=20&c=_0NdupmYE_5KCkVX1rWIQYlklXBK4J9wsTA6HdhoVMk="
                alt="Fast&Reliable"
                className="mb-2"
              />
              <h5 className="fw-bold">Fast & Reliable</h5>
              <p>Quick turnaround time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center my-5">
        <h2 className="fw-bold mb-4">How It Works</h2>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <img
                src="https://media.istockphoto.com/id/1212563205/photo/automotive-mechanic-young-men-checking-under-car-condition-in-garage-at-auto-repair-shop.jpg?s=612x612&w=0&k=20&c=jpq-BXnVo1pEcRdUihGIvWmYVGhsoNYfbmoWLxNPOgY="
                alt="Services"
                className="mb-2"
              />
              <h5 className="fw-bold">1️⃣ Choose a Service</h5>
              <p>Select what your car needs</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <img
                src="https://media.istockphoto.com/id/1405871410/photo/nurse-on-duty-working-on-computer-at-the-reception-desk-in-modern-clinic-and-looking-camera.jpg?s=612x612&w=0&k=20&c=pPW0wXrWYe7Z3OyBA6t9dAxkL7Mb3PaynF0hZOMw96I="
                alt="Booking"
                className="mb-2"
              />
              <h5 className="fw-bold">2️⃣ Book an Appointment</h5>
              <p>Pick a date and time</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <img
                src="https://media.istockphoto.com/id/612257332/photo/car-repair-garage.jpg?s=612x612&w=0&k=20&c=SHmKngKjlqApPOLo31p0obqq7yQ8-JtHB1jzV0_sVSA="
                alt="Fixed Car"
                className="mb-2"
              />
              <h5 className="fw-bold">3️⃣ Get Your Car Fixed</h5>
              <p>Sit back while we do the work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center ">
        <h2 className="fw-bold">Ready to give your car the best care?</h2>
        <p className="lead">Book your service today!</p>
      </section>
    </div>
  );
}

export default Home;