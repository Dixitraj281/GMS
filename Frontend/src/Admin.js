import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getproblemadmin, status_update } from '../src/utils/ApiRequest';
import axios from 'axios';
import './admin.css';

function Admin({ handle_view }) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [problemtype, setProblemtype] = useState([]);
  const [currId, setCurrId] = useState(null);
  const [Show, setShow] = useState(false);
  const [status, setStatus] = useState('');
  const [datavalue, setDatavalue] = useState('');

  const handleViewClick = (a) => {
    handle_view(a);
  }

  useEffect(() => {
    const fetch_problem = async () => {
      const user = JSON.parse(localStorage.getItem("admin"));
      const { data } = await axios.post(getproblemadmin, {
        depart: user.department,
      });
      console.log(data.problem);
      setProblemtype(data.problem);
    }
    if (localStorage.getItem("admin")) {
      fetch_problem();
    } else {
      navigate("/adminlogin");
    }
  }, [refresh]);

  useEffect(() => {
    const authuser = async () => {
      if (localStorage.getItem("admin")) {
        const user = JSON.parse(localStorage.getItem("admin"));
        setRefresh(true);
      } else {
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
    const id = currId;
    const { data } = await axios.post(status_update, { status, id });

    if (data.success === true) {
      await handleClose();
      await setRefresh(!refresh);
      window.location.reload();
    } else {
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

  const Get_detail = () => {
    if (datavalue === 'pending') {
      const modeified_data = problemtype.filter(item => item.status === 'pending');
      setProblemtype(modeified_data);
    } else {
      const modeified_data = problemtype.filter(item => item.status !== 'pending');
      setProblemtype(modeified_data);
    }
  }

  useEffect(() => {
    Get_detail();
  }, [datavalue]);

  return (
    <div>
      <header className='navbar'>
        <div className='navbar__title navbar__item'>Admin Panel</div>
        <Button variant='primary' onClick={handleShowLogout} className="ml-2">Logout</Button>
      </header>
      <div className="mfs-list-table-container">
        <table className="mfs-list-table">
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
            {problemtype.map(item => (
              <tr key={item.id}>
                <td>{item.createdAt}</td>
                <td>{item.email}</td>
                <td>{item.problem}</td>
                <td>{item.status}</td>
                <td><button className='btn-view-parent' onClick={() => handleViewClick(item.Image)}>
                <Link to='/image' className="btn-view">View</Link>
                </button> </td>
                <td>
                  <div className="icons-handle">
                    {!Show && (
                      <button
                        key={item._id}
                        className="btn btn-warning"
                        onClick={() => handleEditClick(item._id)}
                      >
                        Open
                      </button>
                    )}
                    {Show && (
                      <>
                        <div className="openform">
                          <form method="POST">
                            <label htmlFor="">Remarks</label>
                            <input
                              type="text"
                              name='status'
                              placeholder='Write it here..'
                              value={status}
                              onChange={(e) => { setStatus(e.target.value) }}
                            />
                            <button type='button' onClick={handleClose} className='btn btn-warning m-3'>close</button>
                            <button type='submit' className='btn btn-success ' onClick={handleEditSubmit}>submit</button>
                          </form>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
