import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
 import { Route,Routes } from 'react-router-dom'
import Addproduct from '../../Components/Addproduct/Addproduct'
import Listofproduct from '../../Components/Listofproduct/Listofproduct'

const Admin = () => {
  return (
    <div className='admin'>
         <Sidebar />
         <Routes>
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/getproduct' element={<Listofproduct />} />
         </Routes>
    </div>
  )
}

export default Admin
