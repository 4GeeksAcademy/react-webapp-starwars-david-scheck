import React, { useContext } from "react";
import { GrFavorite } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import { Context } from "../store/appContext";


export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Favorites {store.favorites.length}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a className="dropdown-item" href="#">Action</a></li>
        {store.favorites.map((favorite) => (
          <li key={favorite.id}>
            <span><GrFavorite /> {favorite.name}</span>
            <FaTrash onClick={() => actions.toggleFavorite(favorite.id, favorite.type, favorite.name)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
