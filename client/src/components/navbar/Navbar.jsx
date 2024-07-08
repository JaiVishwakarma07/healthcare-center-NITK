import React, { useContext, useEffect, useState } from 'react'
import './navbar.scss'
import DraftsIcon from '@mui/icons-material/Drafts';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link ,useNavigate} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import newRequest from '../../utils/newRequest';
import { AuthContext } from '../../context/authContext';

const Navbar = ({setOpen,open}) => {

    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const [active, setActive] = useState(false);
    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    }

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
            window.removeEventListener("scroll", isActive)
        }
    }, [])

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout")
            localStorage.setItem("user", null)
            navigate('/login')
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div  className='navbar' >
        <div className={active ? "topBar active" : "topBar"}>
            <div className="left">
                <h3><DraftsIcon/> registrar@nitk.ac.in </h3>
                <h3><LocalPhoneIcon/>  0824 247 4000</h3>
            </div>
            {
                !currentUser && <div className="right">
                <h3 onClick={()=>setOpen(!open)} ><LogoutIcon  />Login</h3>
            </div>
            }
            {currentUser && <div className="right">
                <h3><AccountCircleIcon /> {currentUser.name}</h3>
                <h3 onClick={handleLogout} ><LogoutIcon  />Logout</h3>
            </div>}
        </div>
        <div className={currentUser ?  currentUser.userType === 'Admin' ? "mainNav admin" : "mainNav" : "mainNav"} >
            <img src="/images/NITK_logo.png" alt="" />
            <h2>ಆರೋಗ್ಯ ಆರೈಕೆ ಕೇಂದ್ರ<br />ಎನ್.ಐ.ಟಿ.ಕೆ, ಸುರತ್ನಲ್</h2>
            <h2>स्वास्थ्य देखभाल केंद्र <br />एन.आई.टि.के, सुरत्कल्</h2>
            <h2>Health Care Center <br />N.I.T.K, Surathkal</h2>
        </div>
        {currentUser && (currentUser.userType === 'patient' || currentUser.userType === 'Faculty') && <div className="linkBar">
            <Link className='link' to='/' > Home</Link>
            <Link className='link' to='/myappointments' > My Appointments</Link>
            {/* <Link className='link' to='/bookappointments' > Book Appointment</Link> */}
            <Link className='link' to='/report' > My Report</Link>
            <Link className='link' to='/about' > About Us</Link>
        </div>}
        {
            currentUser && currentUser.userType === 'pharmacy' &&
            <div className="linkBar">
                <Link className='link'to='/' > Allotment</Link>
                <Link className='link' to='/medicineRecords' > Records</Link>
            </div>
        }
    </div>
  )
}

export default Navbar