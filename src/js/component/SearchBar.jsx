import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles/SearchBar.module.css";

const SearchBar = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length > 0) {
            const results = actions.searchAll(value);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (item) => {
        setSearchTerm("");
        setSuggestions([]);
        if (item.type === "character") {
            navigate(`/character/${item.id}`);
        } else if (item.type === "planet") {
            navigate(`/planet/${item.id}`);
        } else if (item.type === "vehicle") {
            navigate(`/vehicle/${item.id}`);
        }
    };

    return (
        <div className={styles.searchBar}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search characters, planets, vehicles..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {suggestions.length > 0 && (
                <ul className={styles.suggestions}>
                    {suggestions.map((item, index) => (
                        <li 
                            key={index} 
                            onClick={() => handleSelect(item)}
                            className={styles.suggestionItem}
                        >
                            {item.name} ({item.type})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;