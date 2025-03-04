import React, { Component } from "react";

export const Footer = () => (
    <footer className="footer mt-auto py-3 text-center bg-dark text-white"> {/* Añadí bg-dark y text-white */}
        <p>
            Made with <i className="fa fa-heart text-danger" /> by{" "}
            <a href="http://www.4geeksacademy.com" className="text-white">4Geeks Academy</a> {/* Cambié el color del enlace a blanco */}
        </p>
    </footer>
);
