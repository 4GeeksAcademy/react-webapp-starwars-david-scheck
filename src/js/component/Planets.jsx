import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci"; // Import the empty heart icon
import { FaHeart } from "react-icons/fa"; // Import the filled heart icon

const Planets = () => {
    const { store, actions } = useContext(Context);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [favoriteStatus, setFavoriteStatus] = useState({}); // Track favorite state for each planet
    const containerRef = useRef(null);

    useEffect(() => {
        actions.getPlanetsList();
        actions.getPlanetsCard();
    }, []);

    const scroll = (direction) => {
        const container = containerRef.current;
        if (container) {
            const scrollAmount = 300;
            const newScrollPosition = direction === 'left'
                ? Math.max(scrollPosition - scrollAmount, 0)
                : Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth);
            
            container.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
            setScrollPosition(newScrollPosition);
        }
    };

    const toggleFavorite = (uid, name) => {
        setFavoriteStatus((prevStatus) => ({
            ...prevStatus,
            [uid]: !prevStatus[uid], // Toggle favorite status for the specific planet
        }));
        actions.addFavorites(name); // Call the action to handle adding to favorites
    };

    const containerStyle = {
        display: "flex",
        overflowX: "hidden",
        padding: "20px 0",
        position: "relative",
    };

    const cardStyle = {
        flex: "0 0 auto",
        width: "250px",
        margin: "0 10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    };

    
    const imageContainerStyle = {
        width: "100%",
        height: "300px",
        overflow: "hidden",
    };

    const imageStyle = (uid) => ({
        width: "100%",
        height: "100%",
        backgroundImage: `url(https://starwars-visualguide.com/assets/img/planets/${uid}.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    });

    const arrowStyle = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        color: "#333",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        fontSize: "40px",
        cursor: "pointer",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    };


    return (
        <div style={{ position: "relative" }}>
            <button 
                style={{ ...arrowStyle, left: "10px" }} 
                onClick={() => scroll('left')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(220, 220, 220, 0.9)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.7)"}
            >
                &#8249;
            </button>
            <div ref={containerRef} style={containerStyle}>
                {store.planetsList.map((item, index) => (
                    <div key={index} className="card" style={cardStyle}>
                        <div style={imageContainerStyle}>
                            <div style={imageStyle(item.uid)}></div>
                        </div>
                        <div className="card-body text-start">
                            <h5 className="card-title text-center fw-bold fs-4">{item.name}</h5>
                            <p className="card-text"><b>Population:</b> {store.planetsCard[index]?.population}</p>
                            <p className="card-text"><b>Terrain:</b> {store.planetsCard[index]?.terrain}</p>
                            <p className="card-text"><b>Gravity:</b> {store.planetsCard[index]?.gravity}</p>
                            <div className="d-flex justify-content-between">
                                <Link to={`/DetailsPlanets/${item.uid}`} className="btn btn-outline-dark fw-bold">
                                    Learn more!
                                </Link>
                                <button 
                                    className="btn btn-outline-warning" 
                                    onClick={() => toggleFavorite(item.uid, item.name)}
                                >
                                    {favoriteStatus[item.uid] ? <FaHeart /> : <CiHeart />}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                style={{ ...arrowStyle, right: "10px" }} 
                onClick={() => scroll('right')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(220, 220, 220, 0.9)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.7)"}
            >
                &#8250;
            </button>
        </div>
    );
};

export default Planets;
