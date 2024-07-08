import React, { useContext } from 'react'
import './home.scss'
import EventNoteIcon from '@mui/icons-material/EventNote';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {useNavigate} from 'react-router-dom'
import About from '../../components/about/About';
import { AuthContext } from '../../context/authContext';

const Home = () => {
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = ()=>{
    if(currentUser.userType === 'Faculty')navigate('/selectMember')
    else navigate('/bookappointments')
  }

  return (
   <div className="home">
    <img className='displayImage' src="/images/nitk.jpg" alt="" />
    <div className="actionContainer">
    <div className="actions">
      <div className="item" onClick={()=>navigate('/myappointments')} >
        <EventNoteIcon style={{color : "#383838"}} fontSize='large'  />
        <h3 className='itemName' >My Appointments</h3>
      </div>
      <div className="item" onClick={handleClick} >
        <PendingActionsIcon style={{color : "#383838"}} fontSize='large'/>
        <h3 className='itemName' >Schedule <br /> Appointment</h3>
      </div>
      <div className="item" onClick={()=>navigate('/report')} >
        <SummarizeIcon style={{color : "#383838"}} fontSize='large'/>
        <h3 className='itemName' >My Report</h3>
      </div>
    </div>
    </div>
    <About/>
   </div>
  )
}

export default Home