import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./store/appContext";
import injectContext from "./store/appContext.js";

import Home from "./views/Home.js"
import CharacterDetails from "./views/CharacterDetails.js";
import VehicleDetails from "./views/VehicleDetails.js";
import PlanetDetails from "./views/PlanetDetails.js";
import Navbar from "./component/Navbar.jsx";

const Layout = () => {
	const { actions } = useContext(Context);
	const basename = process.env.BASENAME || "";

	useEffect(() => {
		actions.loadInitialData();
	}, []);

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Navbar />
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