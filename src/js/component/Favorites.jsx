import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleCharacterClick = (characterUrl) => {
        const characterId = characterUrl.split("/").slice(-2, -1)[0];
        navigate(`/CharacterDetails/${characterId}`);
    };

    const getCharacterNameFromUrl = (url) => {
        const urlParts = url.split("/");
        const peopleIndex = urlParts.indexOf("people");
        if (peopleIndex === -1) {
            return "Unknown";
        }
        const characterId = urlParts[peopleIndex + 2];
        const characterName = urlParts[peopleIndex + 3] || "Unknown";
        return characterName;
    };

    return (
        <div className="btn-group">
            <button type="button" className="btn btn-warning dropdown-toggle fs-5 fw-semibold" data-bs-toggle="dropdown">
                Favorites({store.favorites.length})
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2 dropdown-menu-dark">
                {store.favorites.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <a className="dropdown-item" href="#" onClick={() => handleCharacterClick(item)}>
                            {getCharacterNameFromUrl(item)}
                        </a>
                        <i className="fa-solid fa-trash-can" onClick={() => actions.deleteFavorite(item)}></i>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;