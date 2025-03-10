import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";  // Importamos Link para la navegación
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <h1>Hello !!</h1>
            <p>
                <img src={rigoImageUrl} alt="Rigo Baby" />
            </p>
            
            
            {/* Botón para redirigir a la página de actor.js */}
            <Link to="/actor">
                <button className="btn btn-primary">Go to Actor Form</button>
            </Link>
        </div>
    );
};
