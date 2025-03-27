import React from 'react'
import Topbar from '../components/Topbar'   
import Sidebar from '../components/Sidebar' 
import PatientGraph from '../components/PatientGraph'

const Dashboard = () => {
  return (
    <div>
        <Topbar />
        <Sidebar />
        {/* <PatientGraph/> */}
    </div>  
  )
}

export default Dashboard;