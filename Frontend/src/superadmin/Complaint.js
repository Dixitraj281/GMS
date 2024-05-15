import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getproblemsuper,status_update } from '../utils/ApiRequest';
import axios from 'axios';
import './complaint.css';
import Adminsidebar from '../Sidebar/adminsidebar.jsx'


function Complaint({handle_view}) {

  const navigate=useNavigate();
  const [refresh,setRefresh]=useState(false);
  const[problem,setproblem]=useState([]);
  const[currId,setCurrId]=useState(null);
  const [Show,setShow]=useState(false);
  const[status,setstatus]=useState();

  const handleViewClick=(a)=>{
    handle_view(a);
    navigate('/image');
  }

  useEffect(() => {
    const fetch_problem=async()=>{
      const user = JSON.parse(localStorage.getItem("super"))
    const {data} = await axios.post(getproblemsuper);
    const problems = data.problem;
    // console.log(problems.status);
    setRefresh(true);
      const currentTime = new Date();

      const filteredProblems = problems.filter(problem => {
        const problemTime = new Date(problem.createdAt);
        const timeDifference = currentTime - problemTime;
        return timeDifference > 300000 && problem.status === 'pending';
      });
      filteredProblems.forEach(problem => {
        console.log('Complaint forwarded to superadmin:', problem);
      });
    setproblem(filteredProblems);
    }
    if (localStorage.getItem("super") 
    ){
    fetch_problem();
    }else{
      navigate("/superadmin/dashboards-a/1");
    }
  }, [refresh]);

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

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  
  return (
    <>
    <Adminsidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    <div class="mfs-list-table-container">
  <table class="mfs-list-table">
    <thead>
    <tr>
      <th>Complaint Lodged On</th>
      <th>Complaint Lodged By</th>
      <th>Complaint</th>
      <th>Status</th>
      <th>Image</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    {problem.map(item => (
  <tr key={item.id}>
    <td>{item.createdAt}</td>
    <td>{item.user.email}</td> {/* Accessing the 'email' property of the 'user' object */}
    <td>{item.problem}</td>
    <td>{item.status}</td>
    <td>
      <button onClick={() => handleViewClick(item.Image)}>View</button>
    </td>
    <td>
      <div className="icons-handle">
        <button
          key={item._id}
          id={item._id}
          className="btn btn-warning"
          onClick={() => handleEditClick(item._id)}
        >
          open
        </button>
        {Show === true ? (
          <>
            <div className="openform">
              <form method="POST">
                <label htmlFor="">Remarks</label>
                <input
                  type="text"
                  name='status'
                  placeholder='Write it here..'
                  value={status}
                  onChange={(e) => { setstatus(e.target.value) }}
                />
                <div className='btns'>
                  <button type='button' className='btn btn-danger' onClick={handleClose}>Close</button>
                  <button type='submit' className='btn btn-success' onClick={handleEditSubmit}>Submit</button>
                </div>
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
    </>
  )
}

export default Complaint