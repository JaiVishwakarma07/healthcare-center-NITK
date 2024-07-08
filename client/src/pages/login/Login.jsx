import React, { useContext, useEffect, useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import About from '../../components/about/About';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoginModal from '../../components/loginModal/LoginModal';
import newRequest from '../../utils/newRequest';


const Login = () => {

    const [open,setOpen] = useState(false)
    const [data,setdata] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setIsLoading(true)
                const res = await newRequest.get(`/notice/limit`)
                setdata(res.data)
                setIsLoading(false)           
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[])


  return (
    <div className='login'>
        <Navbar setOpen={setOpen} open={open} />
        {open && <LoginModal />}
        <div className="loginContainer">
            <div className="loginTop">
                <div className="posterImageContainer">
                    <img className='posterImage' src="/images/nitk.jpg" alt="" />
                </div>
                <div className="welcomeText">
                    <h1 className="mainText">WELCOME TO HEALTHCARE CENTER <br />NATIONAL INSTITUTE OF TECHNOLOGY KARNATAKA, SURATHKAL</h1>
                </div>
            </div>
            <div className="loginMiddle">
                <div className="noticeBoard">
                    <div className="noticeBoardWrapper">
                        <div className="noticeHeading">
                            <h2 className="headingText">Notice Board</h2>
                            <div className="line"></div>
                        </div>
                        <div className="noticeItems">
                        {
                                isLoading ? "Loading" : 
                                data.map((d)=>(
                                    <span key={d.id} className="item"> <span>{d.date}</span> {d.notice}</span>
                                ))
                            }
                        </div>
                        <Link to='/allNotice' className="noticePageRedirect">View All <ArrowForwardIcon/></Link>
                    </div>
                </div>
                <div className="middleImage">
                    <img src="/images/symbolofmedicine.jpg" alt="" />
                </div>
            </div>
            <About/>
        </div>
        <Footer/>
    </div>
  )
}

export default Login