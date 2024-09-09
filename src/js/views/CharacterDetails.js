import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import './CharacterDetails.css';

function CharacterDetails() {
    const { store, actions } = useContext(Context);
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                // First, try to find the character in the peopleList
                const foundCharacter = store.peopleList.find(person => person.name === id || person.uid === id);

                if (foundCharacter) {
                    // If found in the list, use the uid to fetch details
                    const response = await fetch(`https://www.swapi.tech/api/people/${foundCharacter.uid}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch character details');
                    }
                    const data = await response.json();
                    setCharacter({ ...data.result.properties, uid: foundCharacter.uid });
                } else {
                    // If not found, try to fetch directly using the id (which might be the uid)
                    const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch character details');
                    }
                    const data = await response.json();
                    setCharacter({ ...data.result.properties, uid: id });
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCharacterDetails();
    }, [id, store.peopleList]);

    if (loading) return <div className="container mt-5"><h2>Loading...</h2></div>;
    if (error) return <div className="container mt-5"><h2>Error: {error}</h2></div>;
    if (!character) return <div className="container mt-5"><h2>No character data found</h2></div>;

    return (
        <div className="container mt-5">
            <div className="card border-0 shadow-lg">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                            className="img-fluid rounded-start h-100 object-fit-cover"
                            alt={character.name}
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg" }} />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body d-flex flex-column h-100 justify-content-center">
                            <h1 className="card-title display-4 mb-4">{character.name}</h1>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Height</h5>
                                    <p className="fs-4">{character.height} cm</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Mass</h5>
                                    <p className="fs-4">{character.mass} kg</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Hair Color</h5>
                                    <p className="fs-4">{character.hair_color}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Skin Color</h5>
                                    <p className="fs-4">{character.skin_color}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Eye Color</h5>
                                    <p className="fs-4">{character.eye_color}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Birth Year</h5>
                                    <p className="fs-4">{character.birth_year}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h5 className="text-muted">Gender</h5>
                                    <p className="fs-4">{character.gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetails;