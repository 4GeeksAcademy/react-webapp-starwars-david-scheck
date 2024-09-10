import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleFavoriteClick = (item) => {
        switch (item.type) {
            case 'character':
                navigate(`/character/${item.uid}`);
                break;
            case 'planet':
                navigate(`/planet/${item.uid}`);
                break;
            case 'vehicle':
                navigate(`/vehicle/${item.uid}`);
                break;
            default:
                console.error('Unknown item type:', item.type);
        }
    };

    return (
        <div className="btn-group">
            <button type="button" className="btn btn-warning dropdown-toggle fs-5 fw-semibold" data-bs-toggle="dropdown">
                Favorites({store.favorites.length})
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2 dropdown-menu-dark">
                {store.favorites.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <a className="dropdown-item" href="#" onClick={() => handleFavoriteClick(item)}>
                            {item.name}
                        </a>
                        <i className="fa-solid fa-trash-can" onClick={() => actions.deleteFavorite(item.name)}></i>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;