import React, { useState, useEffect } from "react";
import People from "../component/People.jsx"
import Planets from "../component/Planets.jsx"
import Vehicles from "../component/Vehicles.jsx"
import SpaceshipAnimation from "../component/SpaceshipAnimation.jsx"

const Home = () => {
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-100">
            {showAnimation && <SpaceshipAnimation />}
            <div className="bg-body-tertiary py-3 px-5" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabIndex="0">
                <h4 id="Characters" className="pt-3 fs-3 fw-bold text-danger">Characters</h4>
                <People />
                <h4 id="Planets" className="pt-3 fs-3 fw-bold text-danger">Planets</h4>
                <Planets />
                <h4 id="Vehicles" className="pt-3 fs-3 fw-bold text-danger">Vehicles</h4>
                <Vehicles />
            </div>
        </div>
    );
};

export default Home