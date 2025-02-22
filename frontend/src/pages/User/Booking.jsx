import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import paintingImage from "../../assets/painting.jpg";
import engineImage from "../../assets/engine.jpg";
import tireImage from "../../assets/tire.jpg";
import brakeImage from "../../assets/brake.jpg";
import oilChangeImage from "../../assets/oil_change.jpg";
import batteryImage from "../../assets/battery.jpg";
import transmissionImage from "../../assets/transmission.jpg";
import exhaustImage from "../../assets/exhaust.jpg";
import acRepairImage from "../../assets/ac_repair.jpg";
import alignmentImage from "../../assets/alignment.jpg";
import detailingImage from "../../assets/detailing.jpg";
import suspensionImage from "../../assets/suspension.jpg";

const services = [
  { title: "Painting", img: paintingImage },
  { title: "Engine Maintenance", img: engineImage },
  { title: "Tire & Wheel Services", img: tireImage },
  { title: "Brake Repair", img: brakeImage },
  { title: "Oil Change", img: oilChangeImage },
  { title: "Battery Replacement", img: batteryImage },
  { title: "Transmission Repair", img: transmissionImage },
  { title: "Exhaust System Repair", img: exhaustImage },
  { title: "A/C Repair", img: acRepairImage },
  { title: "Wheel Alignment", img: alignmentImage },
  { title: "Car Detailing", img: detailingImage },
  { title: "Suspension Repair", img: suspensionImage }
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
    alert("Service booked successfully!");
    navigate("/");
  };

  return (
    <Container fluid className="py-5 pt-5" style={{ backgroundColor: "#d7ccc8", minHeight: "100vh" }}>
      <Row className="justify-content-center" style={{ marginTop: "80px" }}>
        {/* Booking Form */}
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
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" name="time" onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" name="phone" placeholder="Enter phone number" onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Control type="text" name="carModel" placeholder="Car Model" onChange={handleChange} required className="mb-3" />
                </Col>
                <Col md={6}>
                  <Form.Control type="text" name="carYear" placeholder="Car Year" onChange={handleChange} required className="mb-3" />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>License Plate (Optional)</Form.Label>
                <Form.Control type="text" name="licensePlate" placeholder="Enter license plate" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Special Requests</Form.Label>
                <Form.Control as="textarea" rows={3} name="specialRequests" placeholder="Any additional requests?" onChange={handleChange} />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100" style={{ backgroundColor: "#5d4037", border: "none" }}>
                Book Now
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Service Cards */}
        <Col md={8}>
          <Row className="g-3" style={{ marginTop: "50px" }}>
            {services.slice(0, 4).map((service, index) => (
              <Col key={index} md={3}>
                <Card className="h-100 shadow border-0" style={{ backgroundColor: "#d7ccc8" }}>
                  <Card.Img variant="top" src={service.img} style={{ height: "150px", objectFit: "cover" }} />
                  <Card.Body className="text-center">
                    <Card.Title>{service.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Middle Row of Services */}
          <Row className="g-3" style={{ marginTop: "50px" }}>
            {services.slice(4, 8).map((service, index) => (
              <Col key={index} md={3}>
                <Card className="h-100 shadow border-0" style={{ backgroundColor: "#d7ccc8" }}>
                  <Card.Img variant="top" src={service.img} style={{ height: "150px", objectFit: "cover" }} />
                  <Card.Body className="text-center">
                    <Card.Title>{service.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Bottom Row of Services */}
          <Row className="g-3" style={{ marginTop: "50px" }}>
            {services.slice(8).map((service, index) => (
              <Col key={index} md={3}>
                <Card className="h-100 shadow border-0" style={{ backgroundColor: "#d7ccc8" }}>
                  <Card.Img variant="top" src={service.img} style={{ height: "150px", objectFit: "cover" }} />
                  <Card.Body className="text-center">
                    <Card.Title>{service.title}</Card.Title>
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