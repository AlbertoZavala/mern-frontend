import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Aplicación Mern
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">                
                <Link className="nav-link" to="/"> Notas </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create"> Crear notas </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user"> Crear usuario </Link>
              </li>              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
