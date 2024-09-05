import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";

const CharacterDetails = () => {
    const { store, actions } = useContext(Context)
    console.log("I am a new person", store.characterId);

    const params = useParams();
    // console.log(params);

    useEffect(() => {
        actions.getCharacterId(params.theid)
    }, [])
    return (
        <div className="py-3 px-5 w-100">
            <div className="card p-3" style={{ maxwidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${params.theid}.jpg`} className="img-fluid rounded" alt="..." />
                    </div>
                    <div className="col-md-8 ps-5 pe-4">
                        <div className="card-body p-0">
                            <h5 className="card-title fw-semibold mb-5 display-1">{store.characterId.properties?.name}</h5>
                            <p className="card-text">{store.characterId.description}</p>
                            <p>Consectetur adipisicing elit. Aliquam quae, distinctio molestiae nam iusto inventore ad maxime corrupti consequatur quos cum pariatur facere, nemo doloribus. Soluta saepe eveniet eaque facere amet dolore, inventore ipsam. Est labore veritatis laborum deleniti rerum? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, qui eum! Quasi quo exercitationem natus tenetur perspiciatis temporibus quam amet excepturi nesciunt doloribus porro soluta, eius tempore aperiam? Error eaque nostrum quibusdam quisquam, atque animi ullam quo vel at doloribus sit sed quaerat doloremque quidem, repellat sint explicabo qui in.</p>
                        </div>
                    </div>
                </div>
                <div className="row pt-2 border-top border-2 border-danger mt-3 text-center fs-5">
                    <div className="col">
                        <p><b>Name</b></p>
                        <p>{store.characterId.properties?.name}</p>
                    </div>
                    <div className="col">
                        <p><b>Birth Year</b></p>
                        <p>{store.characterId.properties?.birth_year}</p>
                    </div>
                    <div className="col">
                        <p><b>Gender</b></p>
                        <p>{store.characterId.properties?.gender}</p>
                    </div>
                    <div className="col">
                        <p><b>Height</b></p>
                        <p>{store.characterId.properties?.height}</p>
                    </div>
                    <div className="col">
                        <p><b>Skin Color</b></p>
                        <p>{store.characterId.properties?.skin_color}</p>
                    </div>
                    <div className="col">
                        <p><b>Eye Color</b></p>
                        <p>{store.characterId.properties?.eye_color}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;