// Sidebar.jsx

import React from 'react';
import "./sidebar.css"
import { Link } from 'react-router-dom';

const adminsidebar = ({ showSidebar, toggleSidebar}) => {
  return (
    <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>  
      </button>
      <div className="links-container">
        <Link to='/admin/complaint'>Complaint</Link>
        <Link to="/login" className='btn btn-danger'>Logout</Link>
      </div>
    </div>
  );
};

export default adminsidebar;
