// Sidebar.jsx

import React from 'react';
import "./sidebar.css"
import { Link } from 'react-router-dom';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  return (
    <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>  
      </button>
      <div className="links-container">
        <Link to='/superadmin/dashboards-a'>Dashboard</Link>
        <Link to='/superadmin/create-admin'>Create Admin</Link>
        <Link to='/superadmin'>View Admin</Link>
        <Link to='/superadmin/manage-users'>Manage users</Link>
        <Link to='/superadmin/complaint/'>Complaint</Link>
        <Link to="/login" className='btn btn-danger'>Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
