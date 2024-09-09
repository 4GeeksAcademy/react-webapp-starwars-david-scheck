import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";

import Home from "./views/Home.js"
import CharacterDetails from "./views/CharacterDetails.js";
import VehicleDetails from "./views/VehicleDetails.js";
import PlanetDetails from "./views/PlanetDetails.js";
import Navbar from "./component/Navbar.jsx";

const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/CharacterDetails/:id" element={
						<React.Fragment>
							{console.log("Rendering CharacterDetails")}
							<CharacterDetails />
						</React.Fragment>
					} />
					<Route path="/PlanetDetails/:id" element={<PlanetDetails />} />
					<Route path="/VehicleDetails/:id" element={<VehicleDetails />} />
					<Route path="*" element={<h1>Not found!</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);