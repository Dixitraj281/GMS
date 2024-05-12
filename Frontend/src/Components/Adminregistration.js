import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {adminregisterAPI} from '../utils/ApiRequest';
import './adminregistration.css'

import axios from "axios"
import { Button } from 'react-bootstrap';

function Adminregistration() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  const navigate=useNavigate();
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const[department,setdepartment]=useState('');
  const [password,setpassword]=useState('');

const validate=async(e)=>{
    e.preventDefault();
const data = await axios.post(adminregisterAPI, {name,email,department,password})
console.log(data.data.success);
if(data.data.success === true){
        window.alert("Admin is Created!");
        window.location.reload();
      }
      else{
        toast.error(data.data.message, toastOptions);
      }     
}
const reset=(e)=>{
  e.preventDefault();
  setemail('');
  setdepartment('');
  setname('');
  setpassword('');
}
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
      <Link to='/Dashboards-a'>Dashboard</Link>
      <Link to='/create-admin'>Create Admin</Link>
      <Link to='/superadmin'>View Admin</Link>
      <Link to='/manage-users'>Manage users</Link>
      <Link to='/Complaint'>Complaint</Link>

    </div> 
    <h2 className='text-center mt-5'>Create an Admin account</h2>
    <div className='container-new justify-content-center"'>
       <form className="form-new" method='POST'>
       <label htmlFor="" className='h4'>Name</label>
        <input type="text" name="" placeholder="name" value={name} 
            onChange={(e)=>{setname(e.target.value)}}/>
        <label htmlFor="" className='mt-3 h4'>Email</label>
        <input type="text" placeholder='email' value={email} 
                  onChange={(e)=>{setemail(e.target.value)}}/><br/>
        <label className="mt-3 h4" htmlFor="">Department</label>
        <select className="mb-3 w-100" name="" id="" value={department} 
                  onChange={(e)=>{setdepartment(e.target.value)}}>
             <option value="">Choose...</option>
            <option value="PWD">Public Works Department</option>
            <option value="HSD">Health and Sanitation Department</option>
            <option value="TD">Transportation Department</option>
            <option value="EPD">Environmental Protection Department</option>
            <option value="SSD">Social Services Department</option>
            <option value="PSD">Public Safety Department</option>
        </select><br/>
        <input type="password" name="" placeholder="Create Password" autoComplete="on" value={password} 
                  onChange={(e)=>{setpassword(e.target.value)}} />
        <button type="submit" className='btn btn-warning m-3' onClick={validate} >Submit</button>
        <button className='btn btn-success m-3' onClick={reset}>Reset</button>
       </form>
    </div>
    </>
  )}

export default Adminregistration