import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paintingImage from "../../assets/painting.jpg";
import engineImage from "../../assets/engine.jpg";
import tireImage from "../../assets/tire.jpg";
import brakeImage from "../../assets/brake.jpg";
import oilChangeImage from "../../assets/oil_change.jpg";
import batteryImage from "../../assets/battery.jpg";

const services = [
  { title: "Painting", img: paintingImage, description: "Give your car a fresh new look with our expert painting services." },
  { title: "Engine Maintenance", img: engineImage, description: "Keep your engine running smoothly with regular maintenance." },
  { title: "Tire & Wheel Services", img: tireImage, description: "Ensure safety and performance with our tire and wheel services." },
  { title: "Brake Repair", img: brakeImage, description: "Stay safe on the road with professional brake repair services." },
  { title: "Oil Change", img: oilChangeImage, description: "Extend your engine's lifespan with a quick and clean oil change." },
  { title: "Battery Replacement", img: batteryImage, description: "Get a reliable battery replacement to avoid unexpected breakdowns." }
];

const Booking = () => {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    carModel: "",
    carYear: "",
    licensePlate: "",
    specialRequests: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Service booked successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setTimeout(() => navigate("/"), 3500);
  };

  return (
    <Container fluid className="py-5 pt-5" style={{ backgroundColor: "#d7ccc8", minHeight: "100vh" }}>
      <ToastContainer />
      <Row className="justify-content-start align-items-start" style={{ marginTop: "80px" }}>
        {/* Booking Form (Far Left) */}
        <Col md={4} className="mb-4">
          <Card className="p-4 shadow-lg" style={{ backgroundColor: "#8d6e63", color: "#fff" }}>
            <h2 className="text-center mb-4">Book a Service</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Service Type</Form.Label>
                <Form.Select name="service" onChange={handleChange} required>
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>{service.title}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Date</Form.Label><Form.Control type="date" name="date" onChange={handleChange} required /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Time</Form.Label><Form.Control type="time" name="time" onChange={handleChange} required /></Form.Group></Col>
              </Row>
              <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChange} required /></Form.Group>
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Phone</Form.Label><Form.Control type="tel" name="phone" placeholder="Enter phone number" onChange={handleChange} required /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Model</Form.Label><Form.Control type="text" name="carModel" placeholder="Enter the Model" onChange={handleChange} required /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Year</Form.Label><Form.Control type="text" name="carYear" placeholder="Enter the year" onChange={handleChange} required /></Form.Group></Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>License Plate (Optional)</Form.Label>
                <Form.Control type="text" name="licensePlate" placeholder="Enter license plate" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Special Requests</Form.Label>
                <Form.Control as="textarea" rows={3} name="specialRequests" placeholder="Any additional requests?" onChange={handleChange} />
              </Form.Group>
              <Button variant="dark" type="submit" className="w-100" style={{ backgroundColor: "#000", border: "none", marginTop: "2rem" }}>
                Book Now
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Services (Right) */}
        <Col md={7}>
          <Row className="g-3">
            {services.map((service, index) => (
              <Col key={index} md={6}>
                <Card className="h-100 shadow border-0" style={{ backgroundColor: "#d7ccc8" }}>
                  <Card.Img variant="top" src={service.img} style={{ height: "150px", objectFit: "cover" }} />
                  <Card.Body className="text-center">
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text style={{ fontSize: "1rem", fontWeight: "bold", color: "#333" }}>
                      {service.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
