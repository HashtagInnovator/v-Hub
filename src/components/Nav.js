/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../assets/nav.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand me-5" to="/">V-Hub</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Explore
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/topic">Topics</Link></li>
                  <li><Link className="dropdown-item" to="/sector">Sectors</Link></li>
                  <li><Link className="dropdown-item" to="/region">Regions</Link></li>
                  <li><Link className="dropdown-item" to="/year">Year</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Me</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
