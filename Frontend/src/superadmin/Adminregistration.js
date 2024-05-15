import React, { useState } from 'react';
import { adminregisterAPI } from '../utils/ApiRequest';
import axios from "axios";
import './adminregistration.css';
import SuperadminSidebar from '../Sidebar/SuperadminSidebar'

function Adminregistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(adminregisterAPI, { name, email, department, password });
      if (data.data.success === true) {
        window.alert("Admin is Created!");
        window.location.reload();
      } else {
        window.alert(data.data.message);
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setDepartment('');
    setPassword('');
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  
  return (
    <>
    <SuperadminSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <h2 className='text-center mt-5'>Create an Admin account</h2>
      <div className='container-new justify-content-center'>
        <div className='form-box'>
        <form className="form-new" method='POST'>
          <label htmlFor="" className='h4'>Name</label>
          <input type="text" name="" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="" className='mt-3 h4'>Email</label>
          <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <label className="mt-3 h4" htmlFor="">Department</label>
          <select className="mb-3 w-100" value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Choose...</option>
            <option value="PWD">Public Works Department</option>
            <option value="HSD">Health and Sanitation Department</option>
            <option value="TD">Transportation Department</option>
            <option value="EPD">Environmental Protection Department</option>
            <option value="SSD">Social Services Department</option>
            <option value="PSD">Public Safety Department</option>
          </select><br />
          <input type="password" placeholder="Create Password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className='btn btn-warning m-3' onClick={handleSubmit}>Submit</button>
          <button className='btn btn-success m-3' onClick={handleReset}>Reset</button>
        </form>
        </div>
      </div>
    </>
  );
}

export default Adminregistration;
