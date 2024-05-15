import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { raiseproblem, add_image } from '../utils/ApiRequest';

import {  toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import './new.css';
import axios from 'axios';
import Sidebar from '../Sidebar/sidebar';

function Newgrievance() {
  const [image, setImage] = useState(null);
  const [department, setDepartment] = useState('');
  const [subdepartment, setSubdepartment] = useState('');
  const [problem, setProblem] = useState('');
  const [location, setlocation] = useState('');

  const departments = {
    PWD: ['Road Management', 'Bridge Maintenance', 'Street Lighting', 'Drainage and Sewerage'],
    HSD: ['Waste Management', 'Sanitation Services', 'Public Health Inspections','Vector Control'],
    TD: ['Public Transit', 'Traffic Management', 'Parking Services','Transportation Planning'],
    EPD: ['Air Quality Management', 'Water Quality Management', 'Hazardous Waste Management','Environmental Compilance'],
    SSD: ['Housing Assistance','Welfare Programs','Child and Family Services','Senior Services'],
    PSD: ['Police Services','Fire and Rescue Services','Emergency Management','Animal Control'],
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setSubdepartment(''); // Reset sub department when department changes
  };

  function generateToken() {
    return uuidv4();
  }
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  };


  const handle_submit=async (e)=>{
    console.log("submit clicked!")
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    console.log("before axios post result");
    const result = await axios.post(
      add_image,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("before axios post after result");

   
    const uniqueToken = generateToken();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const data=await axios.post(raiseproblem,{
      email: user.email,
      subdepartment: subdepartment,
      problem: problem,
      department: department,
      location: location,
      token: uniqueToken,
    })
    if (data.data.success === true) {
      window.alert(`You Have raised your Problem and your Token is ${uniqueToken}`);
      window.location.reload()
      toast.success(data.data.message, toastOptions);

    } else {
      toast.error(data.message, toastOptions);
    }
  }
  const reset=(e)=>{
    e.preventDefault();
      setDepartment('');
      setSubdepartment('');
      setlocation('');
      setProblem('');
      setImage(null);
  }
  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  
  return (
    <>
    <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className='container-new justify-content-center' >
        <div className='form-box'>
        <form className="form-new" method="POST" >

          <label className="h4" htmlFor="">
            Department
          </label>
          <select
            className="mb-3 w-100"
            name=""
            id=""
            value={department}
            onChange={handleDepartmentChange}
          >
            <option value="">Choose...</option>
            <option value="PWD">Public Works Department</option>
            <option value="HSD">Health and Sanitation Department</option>
            <option value="TD">Transportation Department</option>
            <option value="EPD">Environmental Protection Department</option>
            <option value="SSD">Social Services Department</option>
            <option value="PSD">Public Safety Department</option>
            
          </select>
          <label className="h4" htmlFor="">
            Sub Department
          </label>
          <select
            className="mb-3 w-100"
            name=""
            id=""
            value={subdepartment}
            onChange={(e) => setSubdepartment(e.target.value)}
          >
            <option value="">Choose...</option>
            {departments[department] &&
              departments[department].map((subDept) => (
                <option key={subDept} value={subDept}>
                  {subDept}
                </option>
              ))}
          </select>
          <br />
          <label className="h4" htmlFor="">
            Problem
          </label>
          <input
            type="textarea"
            className="form-control"
            id="natureOfComplaint"
            placeholder="Problem Description"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
          <br />
          <Form.Group controlId="formFile" className="">
            <Form.Label className='h4'>Attach File</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={onInputChange} />
          </Form.Group>
          <br/>
          <label className="h4" htmlFor="">
            Location
          </label>
          <input
            type="textarea"
            className="form-control"
            id="natureOfComplaint"
            placeholder="Location..."
            value={location}
            onChange={(e) => setlocation(e.target.value)}
          />
          <button type="submit" className="btn btn-warning" onClick={handle_submit}>
            Submit
          </button>
          <button className="btn btn-success m-3" onClick={reset}>
            Reset
          </button>
        </form>
        </div>
      </div>
    </>
  );
}

export default Newgrievance;
