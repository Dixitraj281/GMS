import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {getproblemadmin,status_update} from '../src/utils/ApiRequest';
import axios from 'axios';

function Admin({handle_view}) {
  const navigate=useNavigate();
  const [refresh,setRefresh]=useState(false);
  const[problemtype,setproblemtype]=useState([]);
  const[currId,setCurrId]=useState(null);
  const [Show,setShow]=useState(false);
  const[status,setstatus]=useState();
  const[datavalue,setdatavalue]=useState("");
  
  const handleViewClick=(a)=>{
    handle_view(a);
  }

  useEffect(() => {
    const fetch_problem=async()=>{
      const user = JSON.parse(localStorage.getItem("admin"))
    const {data} = await axios.post(getproblemadmin,{
      depart: user.department,
    });
    console.log(data.problem);
    // if(datavalue=='pending'){
      const modeified_data=data.problem
      // .filter(item => item.status === 'pending');
      setproblemtype(modeified_data);
    // }else{
    //   const modeified_data=data.problem.filter(item => item.status != 'pending');
    //   setproblemtype(modeified_data);
    // }
    // ;.filter(item => item.department === depart);
    
  
    // console.log(modeified_data);
    }
    if (localStorage.getItem("admin") ){
      fetch_problem();
    }
    else {
      navigate("/adminlogin");
    } 
  }, [refresh]);
  

  useEffect(() => {
    // handlemiddleware();
    const authuser = async () => {
      if (localStorage.getItem("admin") 
      // && JSON.parse(localStorage.getItem("auth"))
    ){
        const user = JSON.parse(localStorage.getItem("admin"));
        // console.log(user);
        setRefresh(true);
        // const token=JSON.parse(localStorage.getItem("auth"));
        // console.log(token);
        // setcUser(user);  
        // setRefresh(true);
      } 
      else {
        navigate("/adminlogin");
      }
    };

    authuser();
  }, [navigate]);

  const handleShowLogout = () => {
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  }
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log(currId);
    const id=currId;
    const {data} = await axios.post(status_update, {status,id});

    if(data.success === true){

      await handleClose();
      await setRefresh(!refresh);
      window.location.reload();
    }
    else{
      console.log("error");
    }

  }

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleEditClick = (itemKey) => {
    console.log("Clicked button ID:", itemKey);
      handleShow();
      setCurrId(itemKey);
  };
  const Get_detail=()=>{
    if(datavalue=='pending'){
      const modeified_data=problemtype.filter(item => item.status === 'pending');
      setproblemtype(modeified_data);
    }else{
      const modeified_data=problemtype.filter(item => item.status != 'pending');
      setproblemtype(modeified_data);
    }
    // window.location.reload();
  }
  useEffect(() => {
  Get_detail();
},[datavalue]);
  return (
    <div>
        {/* <select name="" id="" value={datavalue} 
                  onChange={(e)=>{setdatavalue(e.target.value)}}>
          <option value="pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type='submit' onClick={Get_detail}>Get</button> */}
    <header className='navbar'>
        <div className='navbar__title navbar__item'>Admin Panel</div> 
        <Button variant='primary' onClick={handleShowLogout} className="ml-2">Logout</Button>      
    </header>
    <div class="mfs-list-table-container">
  <table class="mfs-list-table">
    <thead>
    <tr>
      <th>Complaint Lodged On</th>
      <th>Complaint Lodged By</th>
      <th>Complainant</th>
      <th>Status</th>
      <th>Image</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
      {problemtype.map(item=>(
    <tr key={item.id}>
      <td>{item.createdAt}</td>
      <td>{item.email}</td>
      <td>{item.problem}</td>
      <td>{item.status}</td>
      
      <td><button  onClick={() => handleViewClick(item.Image)} ><Link to='/image' className="btn text-decoration-none">View</Link></button></td>
      <td>
                  <div className="icons-handle">
                    <button key={item._id}
                      id={item._id} className="btn btn-warning" onClick={() => handleEditClick(item._id)}>open</button>
                    {Show===true ? 
                    (
                      <>
                      <div className="openform">
                        <form method="POST">
                        <label htmlFor="">Remarks</label>
                        <input type="text" name='status' placeholder='Write it here..' value={status} 
                  onChange={(e)=>{setstatus(e.target.value)}}/>
                        <button type='button' onClick={handleClose}>close</button>
                        <button type='submit' className='btn btn-success' onClick={handleEditSubmit}>submit</button>
                        </form>
                      </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
    </tr>
    ))}
    </tbody>
  </table>
</div>
    </div>
  )
}

export default Admin