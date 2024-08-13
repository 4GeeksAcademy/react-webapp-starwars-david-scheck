import React, {useContext} from "react";
import { GrActions, GrFavorite } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";


export const Navbar = () => {
	const {store} = useContext(Context);

	return (
		<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Favorites {store.favorites.length}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Action</a></li>
    {store.favorites.map()}
	<li>
	<span>{GrFavorite.name}</span>
	<FaTrash onClick={() => GrActions.toggleFavorite(favorite.id, favorite.type, favorite.name)}/>
	</li>
  </ul>
</div>
			</div>
		</nav>
	);
};
