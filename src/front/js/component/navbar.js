import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-end"> {/* Añadí d-flex y justify-content-end */}
                <Link to="/">
                    <button className="btn btn-primary">HOME</button>
                </Link>
            </div>
        </nav>
    );
};
