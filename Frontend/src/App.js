import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Register from './auth/Register';
import Login from './auth/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Adminlogin from './auth/Adminlogin';
import Adminregistration from './Components/Adminregistration';
import Superadmin from './auth/Superadmin';
import Dashboard from './Dashboard';
import Newgrievance from './Newgrievance';
import Admin from './Admin';
import Adminmaster from './Adminmaster';
import View from './View';
import Complaint from './Components/Complaint';
import Home from './Home';
import Dashboardsuperadmin from './Dashboardsuperadmin';
import Manageusers from './Manageusers';

function App() {
  const[image,setimage]=useState(null);
  const handle=(name)=>{
    setimage(name);
    console.log(name);
  }
  return (
    <>
    
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/history' element={<Dashboard/>}/>
      <Route path='/new' element={<Newgrievance/>}/>
      <Route path='/complaint' element={<Complaint handle_view={handle}/>}/>
      <Route path='/create-admin' element={<Adminregistration/>} />
      <Route path='/admin' element={<Admin handle_view={handle}/>}/>
      <Route path='/superadmin' element={<Adminmaster handle_view={handle}/>}/>
      <Route path='/dashboards-a' element={<Dashboardsuperadmin/>}/>
      <Route path='/manage-users' element={<Manageusers/>}/>
      <Route path='/superadminlogin' element={<Superadmin/>}/>
      <Route path='/adminlogin' element={<Adminlogin/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>  
      <Route path="/image" element={<View image={image}/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
