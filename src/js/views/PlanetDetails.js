import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PlanetDetails() {
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPlanetDetails = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch planet details');
                }
                const data = await response.json();
                setPlanet(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPlanetDetails();
    }, [id]);

    if (loading) return <div className="container mt-5"><h2>Loading...</h2></div>;
    if (error) return <div className="container mt-5"><h2>Error: {error}</h2></div>;
    if (!planet) return <div className="container mt-5"><h2>No planet data found</h2></div>;

    return (
        <div className="container mt-5">
            <div className="card border-0 shadow-lg">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                            className="img-fluid rounded-start h-100 object-fit-cover"
                            alt={planet.name}
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body d-flex flex-column h-100 justify-content-center">
                            <h1 className="card-title display-4 mb-4">{planet.name}</h1>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Population</h5>
                                    <p className="fs-4">{planet.population}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Climate</h5>
                                    <p className="fs-4">{planet.climate}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Terrain</h5>
                                    <p className="fs-4">{planet.terrain}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Diameter</h5>
                                    <p className="fs-4">{planet.diameter} km</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Gravity</h5>
                                    <p className="fs-4">{planet.gravity}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Rotation Period</h5>
                                    <p className="fs-4">{planet.rotation_period} hours</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Orbital Period</h5>
                                    <p className="fs-4">{planet.orbital_period} days</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Surface Water</h5>
                                    <p className="fs-4">{planet.surface_water}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanetDetails;