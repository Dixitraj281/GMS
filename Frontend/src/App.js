import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Adminlogin from './auth/Adminlogin';
import Adminregistration from './superadmin/Adminregistration.js';
import Superadmin from './auth/Superadmin';
import Dashboard from './User/Dashboard.js';
import Newgrievance from './User/Newgrievance.js';
import Adminmaster from './superadmin/Adminmaster.js';
import View from './View';
import Complaint from './superadmin/Complaint.js';
import Home from './User/Home.jsx';
import Dashboardsuperadmin from './superadmin/Dashboardsuperadmin.jsx';
import Manageusers from './superadmin/Manageusers.jsx';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import SuperadminComplaint from './superadmin/SuperadminComplaint';

function App() {
  const [image, setImage] = useState(null);

  const handle = (name) => {
    setImage(name);
    console.log(name);
  };

  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div className="context">
          <Router>
            <Navbar/>
            {/* <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar}  userRole={userRole} /> */}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/user/history' element={<Dashboard />} />
              <Route path='/user/new' element={<Newgrievance />} />
              <Route path='/superadmin/complaint' element={<SuperadminComplaint handle_view={handle} />} />
              <Route path='/admin/complaint' element={<Complaint handle_view={handle} />} />
              <Route path='/superadmin/create-admin' element={<Adminregistration />} />
              <Route path='/superadmin' element={<Adminmaster handle_view={handle} />} />
              <Route path='/superadmin/dashboards-a' element={<Dashboardsuperadmin />} />
              <Route path='/superadmin/manage-users' element={<Manageusers />} />
            <Route path='/superadminlogin' element={<Superadmin />} />
            <Route path='/adminlogin' element={<Adminlogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
              <Route path="/image" element={<View image={image} />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
