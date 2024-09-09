import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VehicleDetails() {
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch vehicle details');
                }
                const data = await response.json();
                setVehicle(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVehicleDetails();
    }, [id]);

    if (loading) return <div className="container mt-5"><h2>Loading...</h2></div>;
    if (error) return <div className="container mt-5"><h2>Error: {error}</h2></div>;
    if (!vehicle) return <div className="container mt-5"><h2>No vehicle data found</h2></div>;

    return (
        <div className="container mt-5">
            <div className="card border-0 shadow-lg">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
                            className="img-fluid rounded-start h-100 object-fit-cover"
                            alt={vehicle.name}
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg" }} />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body d-flex flex-column h-100 justify-content-center">
                            <h1 className="card-title display-4 mb-4">{vehicle.name}</h1>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Model</h5>
                                    <p className="fs-4">{vehicle.model}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Manufacturer</h5>
                                    <p className="fs-4">{vehicle.manufacturer}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Cost in Credits</h5>
                                    <p className="fs-4">{vehicle.cost_in_credits}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Length</h5>
                                    <p className="fs-4">{vehicle.length} m</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Max Speed</h5>
                                    <p className="fs-4">{vehicle.max_atmosphering_speed} km/h</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Crew</h5>
                                    <p className="fs-4">{vehicle.crew}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Passengers</h5>
                                    <p className="fs-4">{vehicle.passengers}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Vehicle Class</h5>
                                    <p className="fs-4">{vehicle.vehicle_class}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VehicleDetails;
