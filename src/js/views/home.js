import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CiHeart } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const scrollRowStyles = {
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  position: 'relative',
};

const hideScrollbarStyles = `
  .scroll-row::-webkit-scrollbar {
    display: none;
  }
`;

const arrowButtonStyles = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 1000,
  fontSize: '24px',
};

const cardTextStyles = {
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
};

export const Home = () => {
  const { store, actions } = useContext(Context);
  const scrollRef = useRef(null);

  useEffect(() => {
    actions.fetchCharacters();
	actions.fetchPlanets();
  }, []);

  const smoothScroll = (scrollOffset) => {
    const container = scrollRef.current;
    if (!container) return;

    const start = container.scrollLeft;
    const startTime = performance.now();
    const duration = 500; // Duration of scroll in milliseconds

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        const easeInOutCubic = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        container.scrollLeft = start + scrollOffset * easeInOutCubic;
        requestAnimationFrame(animateScroll);
      } else {
        container.scrollLeft = start + scrollOffset;
      }
    };

    requestAnimationFrame(animateScroll);
  };

  if (store.isLoading) return <p>Loading characters...</p>;
  if (store.error) return <p>Error: {store.error}</p>;

  return (
    <div className="container-fluid mt-4">
      <style>{hideScrollbarStyles}</style>
      <h1 className="mb-4">Star Wars Characters</h1>
      <div style={{ position: 'relative' }}>
        <button 
          style={{ ...arrowButtonStyles, left: '20px' }} 
          onClick={() => smoothScroll(-300)}
        >
          <FaChevronLeft />
        </button>
        <button 
          style={{ ...arrowButtonStyles, right: '20px' }} 
          onClick={() => smoothScroll(300)}
        >
          <FaChevronRight />
        </button>
        <div className="scroll-row d-flex flex-nowrap" style={scrollRowStyles} ref={scrollRef}>
          {store.characters.map((character) => (
            <div key={character.uid} className="me-3" style={{ minWidth: '18rem' }}>
              <div className="card" style={{ width: "18rem" }}>
                <img 
                  src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`} 
                  className="card-img-top" 
                  alt={character.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x500?text=Image+Not+Available";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{character.name}</h5>
                  <p className="card-text" style={cardTextStyles}>Click below to learn more about this character.</p>
                  <Link to={`/character-details/${character.uid}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <button 
                    className="btn btn-outline-danger ms-2"
                    onClick={() => actions.toggleFavorite(character.uid, "CHARACTER", character.name)}
                  >
                    <CiHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};