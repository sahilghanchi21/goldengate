// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // You'll need to create this CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/admin-dashboard" activeClassName="active">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin-profiles" activeClassName="active">Manage Profiles</NavLink>
          </li>
          <li>
            <NavLink to="/admin-settings" activeClassName="active">Settings</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
