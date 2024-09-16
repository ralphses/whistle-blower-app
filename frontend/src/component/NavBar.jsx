import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="nav">
      <a href="/" className="title">
        Whistle<span> Chain</span>
      </a>
      <ul>
        <li className="active">
          <Link to="/">Home</Link>
        </li>
        <li className="active">
          <Link to="/about">About</Link>
        </li>
        <li className="active">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="active">
          <Link to="/report/:id">Reports</Link>
        </li>

        {/* Dropdown for Agency */}
        <li className="active agency-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <span className="dropdown-title">Agency</span>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/agencyForm">Register an Agency</Link>
              </li>
              <li>
                <Link to="/agencyLogin">Sign In</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="active">
          <Button />
        </li>
      </ul>
    </nav>
  );
}
