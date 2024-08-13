import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router';

export function CharacterDetails () {
    const { characterID } = useParams ();
    const [characterData, setChracterData] = useState(null);
    useEffect(() => {

    }, [])};

    const fetchCharacterData = () => {
        fetch(`https://www.swapi.tech/api/people/${characterID}`
            .then((res) => res.json())
            .then((payload) => {
                console.log(payload)
                setCharacterData(payload.result.properties)
            })
        )
    }

    return (
        <div>
            <h1>Welcome to the details screen</h1>

            {!!characterData && (
                <div>
                    <p>Birth Year: {characterData.birth_year}</p>
                    <p>Gender: {characterData.gender}</p>
                    <p>Eye Color: {characterData.eye_color}</p>
                </div>
            )}

        </div>
    )
}