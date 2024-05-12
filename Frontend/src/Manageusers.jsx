import React from 'react'
import { useState,useEffect } from 'react';
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { getadmin,delete_admin} from './utils/ApiRequest';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Manageusers() {
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
  const admindelete=async(id)=>{
    const {data}=await axios.post(delete_admin,{id:id})
    if(data.success==true){
      window.alert("admin is deleted");
      window.location.reload();
    }
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
    <div className="row row-cols-md-3 row-cols-md-3 g-2">
  {adminuser.map((item, index) => (
    <div className="col " key={index}>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=1024x1024&w=is&k=20&c=r--oPfS14d-ybe3adW-c_oy6q1tCz1c16SN8h5EdoKk="
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h1 className="card-title">User-email:{item.email}</h1>
          <p className="card-text">Selected-Department: {item.department}</p>
          <p className="card-text">User-Name: {item.name}</p>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => admindelete(item._id)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </>

  )
}

export default Manageusers;