import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";

const Favorites = () => {
    const {store, actions} = useContext(Context);

    useEffect(()=>{
        actions.deleteFavorite();
    },[])

    return(
        <div className="btn-group">
            <button type="button" className="btn btn-warning dropdown-toggle fs-5 fw-semibold" data-bs-toggle="dropdown">
                Favorites({store.favorites.length})
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2 dropdown-menu-dark">
                {
                    store.favorites.map((item,index)=>(
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center"><a className="dropdown-item" href="#">{item}</a><i className="fa-solid fa-trash-can" onClick={()=>actions.deleteFavorite(item)}></i></li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Favorites