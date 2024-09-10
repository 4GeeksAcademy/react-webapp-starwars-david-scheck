import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./store/appContext";
import injectContext from "./store/appContext.js";

import Home from "./views/Home.js"
import CharacterDetails from "./views/CharacterDetails.js";
import VehicleDetails from "./views/VehicleDetails.js";
import PlanetDetails from "./views/PlanetDetails.js";
import Navbar from "./component/Navbar.jsx";
import LaserShot from "./component/LaserShot.jsx";
import SpaceshipAnimation from "./component/SpaceshipAnimation.jsx";

const Layout = () => {
	const { actions } = useContext(Context);
	const basename = process.env.BASENAME || "";
	const [key, setKey] = useState(0);
	const [showSpaceship, setShowSpaceship] = useState(true);

	useEffect(() => {
		actions.loadInitialData();
	}, []);

	const handleSpaceshipHit = () => {
		console.log("Spaceship hit!");
		setShowSpaceship(false);
		setTimeout(() => {
			setKey(prevKey => prevKey + 1);
			setShowSpaceship(true);
		}, 1500);
	};

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Navbar />
				<LaserShot />
				{showSpaceship && <SpaceshipAnimation key={key} onHit={handleSpaceshipHit} />}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/character/:id" element={<CharacterDetails />} />
					<Route path="/planet/:id" element={<PlanetDetails />} />
					<Route path="/vehicle/:id" element={<VehicleDetails />} />
					<Route path="*" element={<h1>Not found!</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);