import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import "./allNotice.scss"
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const AllNotice = () => {

    const [data,setdata] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setIsLoading(true)
                const res = await newRequest.get(`/notice`)
                setdata(res.data)
                setIsLoading(false)           
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[])


  return (
    <div className="allNotice">
        <Navbar/>
        <div className="allNoticeContainer">
            <div className="menu">
                <h3 className="menuHeading active" >Notice Board </h3>
                {/* <h3 className="menuHeading" >Scheduled </h3> */}
            </div>
            <div className="allNoticeWrapper">
                <div className="noticeItems">
                    {isLoading ? "Loading" : 
                        data.map((d)=>(
                            <span key={d.id} className="item"> <span>{d.date}</span> {d.notice}</span>
                        ))
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AllNotice