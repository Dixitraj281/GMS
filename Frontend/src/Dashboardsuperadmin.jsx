import React, { useEffect, useState } from 'react';
import './dashboardsuperadmin.css'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getadmin } from './utils/ApiRequest';

const Dashboardsuperadmin = () => {
  const navigate=useNavigate();
  const [refresh,setRefresh]=useState(false);
  const[adminuser,setadminuser]=useState([]);
  useEffect(() => {
    const fetch_problem=async()=>{
    const {data} = await axios.post(getadmin);
    console.log(data.admin);
    const modeified_data=data.admin;
    setadminuser(modeified_data);
    }
    if (localStorage.getItem("super") ){
      fetch_problem();
    }
    else {
      navigate("/superadminlogin");
    } 
  }, [refresh]);

  useEffect(() => {
    // handlemiddleware;
    const authuser = async () => {
      if (localStorage.getItem("super") 
    ){
        const user = JSON.parse(localStorage.getItem("super"));

      } 
      else {
        navigate("/superadminlogin");
      }
    };

    authuser();
  }, [navigate]);
  const handleShowLogout = () => {
    localStorage.removeItem("super");
    navigate("/superadminlogin");
  }
  return (
    <>
    <header className='navbar'>
        <div className='navbar__title navbar__item'>SuperAdmin Panel</div>    
        <Button variant='primary' onClick={handleShowLogout} className="ml-2">Logout</Button>         
    </header>
    <div className="sidenavbar">
      <Link to='/dashboards-a'>Dashboard</Link>
      <Link to='/create-admin'>Create Admin</Link>
      <Link to='/superadmin'>View Admin</Link>
      <Link to='/manage-users'>Manage users</Link>
      <Link to='/Complaint'>Complaint</Link>

    </div> 
    <table className="dashboard-table w-90">
      <thead>
        <tr>
          <th>Section</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Overview Section:</strong></td>
          <td>
            <ul>
              <li>Total Number of Users:03</li>
              <li>Total Number of Active Users:02</li>
              <li>Total Number of Inactive Users:01</li>
              <li>Total Number of Admins:06</li>
              <li>Total Number of Superadmins:01</li>
              <li>Recent Activity Feed (logs of important actions taken by admins and users)</li>
            </ul>
          </td>
        </tr>
        {/* Add other sections here similarly */}
      </tbody>
    </table>
    </>
  );
}

export default Dashboardsuperadmin;
