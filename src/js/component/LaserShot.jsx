import React, { useState, useEffect } from 'react';
import './styles/LaserShot.css';

const LaserShot = () => {
    const [lasers, setLasers] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const newLaser = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                angle: Math.atan2(e.clientY - window.innerHeight / 2, e.clientX - window.innerWidth / 2) * 180 / Math.PI
            };
            setLasers(prevLasers => [...prevLasers, newLaser]);

            // Animate the laser
            const animateLaser = (timestamp) => {
                const laser = document.getElementById(`laser-${newLaser.id}`);
                if (laser) {
                    const rect = laser.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    // Dispatch custom event for collision detection
                    window.dispatchEvent(new CustomEvent('laserMoved', { detail: { x: centerX, y: centerY, laserId: newLaser.id } }));

                    if (rect.right < 0 || rect.left > window.innerWidth || rect.bottom < 0 || rect.top > window.innerHeight) {
                        setLasers(prevLasers => prevLasers.filter(l => l.id !== newLaser.id));
                    } else {
                        requestAnimationFrame(animateLaser);
                    }
                }
            };
            requestAnimationFrame(animateLaser);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className="laser-container">
            {lasers.map(laser => (
                <div
                    key={laser.id}
                    id={`laser-${laser.id}`}
                    className="laser"
                    style={{
                        left: `${laser.x}px`,
                        top: `${laser.y}px`,
                        transform: `rotate(${laser.angle}deg)`
                    }}
                />
            ))}
        </div>
    );
};

export default LaserShot;