import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { raiseproblem, add_image } from './utils/ApiRequest';
import {  toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import '../src/new.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Newgrievance() {
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
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

  const navigate = useNavigate();
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

  const handleShowLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handle_submit=async (e)=>{
    console.log("submit clicked!")
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    const result = await axios.post(
      add_image,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    const uniqueToken = generateToken();
    const user = JSON.parse(localStorage.getItem('user'));
    const data=await axios.post(raiseproblem,{
      // email:email,
      // problem:problem,
      // department:department,
      // token:uniqueToken,
      email: user.email,
      address: address,
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
      setAddress('');
      setSubdepartment('');
      setlocation('');
      setProblem('');
      setImage(null);
  }
  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  // const handle_submit = async (e) => {
  //   e.preventDefault();
  
  //   if (!image || !address || !department || !problem || !location) {
  //     // Handle case where any field is empty
  //     toast.error('Please fill in all fields.', toastOptions);
  //     return;
  //   }
  
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', image);
  
  //     // Upload image
  //     await axios.post(add_image, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     const uniqueToken = generateToken();
  //     const user = JSON.parse(localStorage.getItem('user'));
  
  //     if (!user || !user.email) {
  //       // Handle case where user data is missing or invalid
  //       toast.error('User data is missing or invalid.', toastOptions);
  //       return;
  //     }
  
  //     // Raise problem
  //     const problemResponse = await axios.post(raiseproblem, {
  //       email: user.email,
  //       address: address,
  //       subdepartment: subdepartment,
  //       problem: problem,
  //       department: department,
  //       location: location,
  //       token: uniqueToken,
  //     });
  
  //     if (problemResponse.data.success === true) {
  //       toast.success(`You have raised your problem. Your Token is ${uniqueToken}`, toastOptions);
  //       // Update UI dynamically instead of reloading the page
  //       // Optionally, you can redirect the user to another page after successful submission
  //     } else {
  //       toast.error(problemResponse.data.message, toastOptions);
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during the HTTP requests
  //     console.error('Error:', error);
  //     toast.error('An error occurred while submitting the form. Please try again later.', toastOptions);
  //   }
  // };
  
  
  

  // const reset = (e) => {
  //   e.preventDefault();
  //   setDepartment('');
  //   setAddress('');
  //   setSubdepartment('');
  //   setlocation('');
  //   setProblem('');
  //   setImage(null);
  // };

  // const onInputChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  return (
    <>
    <header className='navbar'>
        <div className='navbar__title navbar__item'>User Panel</div>
        <h1 className="text-center">Raise Your Problem</h1>
      </header>
      <div className="sidenavbar">
      <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/new"> Grievance</Link>
        <button type="submit" className="btn btn-primary btn-block my-4" onClick={handleShowLogout}>Logout</button>
      </div>
      <div className='container-new justify-content-center'>
        <form className="form-new" method="POST">

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
    </>
  );
}

export default Newgrievance;
