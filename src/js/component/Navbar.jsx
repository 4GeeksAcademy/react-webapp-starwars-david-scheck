import React from "react";
import { Link } from "react-router-dom";
import Favorites from "./Favorites.jsx";
import SearchBar from "./SearchBar.jsx";
import style from "./styles/Navbar.module.css"

const Navbar = () => {
	return (
		<nav className="nav d-flex flex-column align-items-center flex-sm-row bg-black px-5 sticky-sm-top" id="navbar-example2">
			<Link to="/">
				<img className={`rounded-3 ${style.logo}`} src="https://brandemia.org/contenido/subidas/2021/05/portada-starwars-imagenes-brandemia-blog-1000x670.jpg" alt="" />
			</Link>
			<a className="flex-sm-fill text-sm-center nav-link text-white fs-5" href="#Characters">Characters</a>
			<a className="flex-sm-fill text-sm-center nav-link text-white fs-5" href="#Planets">Planets</a>
			<a className="flex-sm-fill text-sm-center nav-link text-white fs-5" href="#Vehicles">Vehicles</a>
			<SearchBar />
			<Favorites />
		</nav>
	);
};

export default Navbar;