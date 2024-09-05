import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";

const PlanetsDetails = () => {
    const{store, actions} = useContext(Context)
    // console.log("I am a new planet", store.planetId);
    const params = useParams();
    // console.log(params);
    
    useEffect(()=>{
        actions.getPlanetId(params.theid)
    },[])
	return (
        <div className="py-3 px-5 w-100">
            <div className="card p-3" style={{maxwidth: "540px"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${params.theid}.jpg`} className="img-fluid rounded" alt="..."/>
                    </div>
                    <div className="col-md-8 ps-5 pe-4">
                        <div className="card-body p-0">
                            <h5 className="card-title fw-semibold mb-5 display-1">{store.planetId.properties?.name}</h5>
                            <p className="card-text">{store.planetId.description}</p>
                            <p>Consectetur adipisicing elit. Aliquam quae, distinctio molestiae nam iusto inventore ad maxime corrupti consequatur quos cum pariatur facere, nemo doloribus. Soluta saepe eveniet eaque facere amet dolore, inventore ipsam. Est labore veritatis laborum deleniti rerum? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, qui eum! Quasi quo exercitationem natus tenetur perspiciatis temporibus quam amet excepturi nesciunt doloribus porro soluta, eius tempore aperiam? Error eaque nostrum quibusdam quisquam, atque animi ullam quo vel at doloribus sit sed quaerat doloremque quidem, repellat sint explicabo qui in.</p>
                        </div>
                    </div>
                </div>
                <div className="row pt-2 border-top border-2 border-danger mt-3 text-center fs-5">
                    <div className="col">
                        <p><b>Name</b></p>
                        <p>{store.planetId.properties?.name}</p>
                    </div>
                    <div className="col">
                        <p><b>Climate</b></p>
                        <p>{store.planetId.properties?.climate}</p>
                    </div>
                    <div className="col">
                        <p><b>Population</b></p>
                        <p>{store.planetId.properties?.population}</p>
                    </div>
                    <div className="col">
                        <p><b>Orbital Period</b></p>
                        <p>{store.planetId.properties?.orbital_period}</p>
                    </div>
                    <div className="col">
                        <p><b>Rotation Period</b></p>
                        <p>{store.planetId.properties?.rotation_period}</p>
                    </div>
                    <div className="col">
                        <p><b>Diameter</b></p>
                        <p>{store.planetId.properties?.diameter}</p>
                    </div>
                    <div className="col">
                        <p><b>Terrain</b></p>
                        <p>{store.planetId.properties?.terrain}</p>
                    </div>
                    <div className="col">
                        <p><b>Surface Water</b></p>
                        <p>{store.planetId.properties?.surface_water}</p>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default PlanetsDetails;