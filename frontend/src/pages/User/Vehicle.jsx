import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import toyotaImage from "../../assets/toyota.jpg";
import mitsubishiImage from "../../assets/mitsubishi.jpg";
import mercedesImage from "../../assets/mercedes.jpg";
import bmwImage from "../../assets/bmw.jpg";
import fordImage from "../../assets/ford.jpg";
import hondaImage from "../../assets/honda.jpg";

const vehicles = [
  { id: 1, name: "Toyota Corolla", type: "Sedan", price: "Ksh 3,000", Service_provided: "Painting", img: toyotaImage, },
  { id: 2, name: "Mitsubishi L200", type: "Pickup Truck", price: "Ksh 5,500", img: mitsubishiImage },
  { id: 3, name: "Mercedes Sprinter", type: "Van", price: "Ksh 7,000", img: mercedesImage },
  { id: 4, name: "BMW X5", type: "SUV", price: "Ksh 10,000", img: bmwImage },
  { id: 5, name: "Ford Ranger", type: "Pickup Truck", price: "Ksh 6,500", img: fordImage },
  { id: 6, name: "Honda Accord", type: "Sedan", price: "Ksh 4,500", img: hondaImage },
];

const Vehicle = () => {
  const navigate = useNavigate();

  const handleBookNow = (vehicle) => {
    navigate("/book", { state: { vehicle } });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column">
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center mb-4 fw-bold text-primary">Available Vehicles</h2>
        <div className="row g-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="col-md-4">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="position-relative">
                  <img src={vehicle.img} className="card-img-top" alt={vehicle.name} style={{ height: "200px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{vehicle.name}</h5>
                  <p className="card-text">Type: {vehicle.type}</p>
                  <p className="card-text fw-bold">Price: {vehicle.price}</p>
                  <button className="btn btn-gradient w-100 fw-bold text-white" onClick={() => handleBookNow(vehicle)}>
                    Book Now 🚗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Vehicle;
