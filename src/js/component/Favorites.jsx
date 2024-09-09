import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleFavoriteClick = (name) => {
        navigate(`/CharacterDetails/${name}`);
    };

    return (
        <div className="btn-group">
            <button type="button" className="btn btn-warning dropdown-toggle fs-5 fw-semibold" data-bs-toggle="dropdown">
                Favorites({store.favorites.length})
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2 dropdown-menu-dark">
                {store.favorites.map((name, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <a className="dropdown-item" href="#" onClick={() => handleFavoriteClick(name)}>
                            {name}
                        </a>
                        <i className="fa-solid fa-trash-can" onClick={() => actions.deleteFavorite(name)}></i>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;