import React, { useState, useEffect, useRef } from 'react';
import './styles/SpaceshipAnimation.css';

const SpaceshipAnimation = ({ onHit }) => {
    const [isHit, setIsHit] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [flightPath, setFlightPath] = useState({ startY: 0, endY: 0 });
    const spaceshipRef = useRef(null);

    const generateRandomFlightPath = () => {
        const startY = Math.random() * (window.innerHeight - 100);
        const endY = Math.random() * (window.innerHeight - 100);
        setFlightPath({ startY, endY });
    };

    useEffect(() => {
        generateRandomFlightPath();

        const checkCollision = (event) => {
            if (spaceshipRef.current && !isHit) {
                const rect = spaceshipRef.current.getBoundingClientRect();
                const { x, y } = event.detail;
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    setIsHit(true);
                    setPosition({ x: rect.left, y: rect.top });
                    onHit();
                }
            }
        };

        window.addEventListener('laserMoved', checkCollision);

        return () => {
            window.removeEventListener('laserMoved', checkCollision);
        };
    }, [onHit, isHit]);

    return (
        <div className="spaceship-container">
            {!isHit && (
                <div 
                    ref={spaceshipRef} 
                    className="spaceship"
                    style={{
                        '--start-y': `${flightPath.startY}px`,
                        '--end-y': `${flightPath.endY}px`
                    }}
                ></div>
            )}
            {isHit && (
                <div 
                    className="explosion"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`
                    }}
                ></div>
            )}
        </div>
    );
};

export default SpaceshipAnimation;