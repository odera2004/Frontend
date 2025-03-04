import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WorkOrderContext } from "../../context/WorkOrderContext"; // Adjust the import path if necessary

import paintingImage from "../../assets/painting.jpg";
import engineImage from "../../assets/engine.jpg";
import tireImage from "../../assets/tire.jpg";
import brakeImage from "../../assets/brake.jpg";
import oilChangeImage from "../../assets/oil_change.jpg";
import batteryImage from "../../assets/battery.jpg";

const services = [
  { title: "Painting", img: paintingImage, description: "Give your car a fresh new look with our expert painting services.", cost: "10,000 - 20,000" },
  { title: "Engine Maintenance", img: engineImage, description: "Keep your engine running smoothly with regular maintenance.", cost: "15,000 - 50,000" },
  { title: "Tire & Wheel Services", img: tireImage, description: "Ensure safety and performance with our tire and wheel services.", cost: "6,500 - 10,000" },
  { title: "Brake Repair", img: brakeImage, description: "Stay safe on the road with professional brake repair services.", cost: "10,000 - 15,000" },
  { title: "Oil Change", img: oilChangeImage, description: "Extend your engine's lifespan with a quick and clean oil change.", cost: "8,000 - 12,000" },
  { title: "Battery Replacement", img: batteryImage, description: "Get a reliable battery replacement to avoid unexpected breakdowns.", cost: "10,000 - 20,000" }
];

const Booking = () => {
  const [formData, setFormData] = useState({
    service: "", 
    date: "",
    time: "",
    email: "", 
    technicianId: "", 
    licensePlate: "", 
  });

  const [technicians, setTechnicians] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();
  const { createWorkOrder } = useContext(WorkOrderContext); 

  // Fetch technicians from the backend
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/technicians");
        if (!response.ok) {
          throw new Error("Failed to fetch technicians");
        }
        const data = await response.json();
        setTechnicians(data);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to validate email and fetch user ID
  const validateEmailAndFetchUserId = async (email) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/email/${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      return data.id; // Return the user ID
    } catch (error) {
      console.error("Error validating email:", error);
      setErrorMessage("User not found. Please enter a valid email.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and fetch user ID
    const userId = await validateEmailAndFetchUserId(formData.email);
    if (!userId) {
      return; // Stop if user ID is not found
    }

    // Prepare work order data with user ID
    const workOrderData = {
      description: formData.service, // Use the selected service as the description
      user_id: userId, // Retrieved from the email validation
      technician_id: formData.technicianId, // Selected technician
      status: "Pending", // Default status
      vehicle_id: formData.licensePlate || null, // Optional
    };

    // Send the work order data to the backend
    const result = await createWorkOrder(workOrderData);

    if (result && !result.error) {
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
    } else {
      toast.error("There was an issue with booking the service.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <Container fluid className="py-5 pt-5" style={{ backgroundColor: "#d7ccc8", minHeight: "100vh" }}>
      <ToastContainer />
      <Row className="justify-content-evenly align-items-center" style={{ marginTop: "0px" }}>
        <Col md={4} className="mb-4">
          <Card className="p-4 shadow-lg" style={{ backgroundColor: "#8d6e63", color: "#fff" }}>
            <h2 className="text-center mb-4">Book a Service</h2>
            <Form onSubmit={handleSubmit}>
              {/* Service Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label>Service Type</Form.Label>
                <Form.Select name="service" onChange={handleChange} required>
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Date and Time Inputs */}
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

              {/* Email Input */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errorMessage && <small className="text-danger">{errorMessage}</small>}
              </Form.Group>

              {/* Technician Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label>Technician</Form.Label>
                <Form.Select name="technicianId" onChange={handleChange} required>
                  <option value="">Select a technician</option>
                  {technicians.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.first_name} {tech.last_name} - {tech.skill_set}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* License Plate Input (Optional) */}
              <Form.Group className="mb-3">
                <Form.Label>License Plate (Optional)</Form.Label>
                <Form.Control type="text" name="licensePlate" placeholder="Enter license plate" onChange={handleChange} />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="dark" type="submit" className="w-100" style={{ backgroundColor: "#000", border: "none", marginTop: "2rem" }}>
                Book Now
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Service Cards */}
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
                    <Card.Text style={{ fontSize: "1rem", fontWeight: "bold", color: "#d32f2f" }}>
                      Cost: {service.cost}
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