// Sidebar.jsx

import React from 'react';
import "./sidebar.css"
import { Link } from 'react-router-dom';

const Sidebar = ({ showSidebar, toggleSidebar}) => {
  return (
    <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>  
      </button>
      <div className="links-container">
      <Link to="/">Home</Link>
      <Link to="/user/history">History</Link>
      <Link to="/user/new">Grievance</Link>
      <Link to="/login" className='btn btn-danger'>Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
