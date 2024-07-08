import React from 'react'
import './bookAppointment.scss'
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import { Link, useLocation } from 'react-router-dom';

const BookAppointment = () => {
  
  const { search } = useLocation()
  const memberId = search.substring(10);


  const { isLoading, error, data } = useQuery({
    queryKey: ['doctor'],
    queryFn: () => newRequest.get(`/doctor/specialisation`).then((res) => {
        return res.data
    })
  })


  return (
    <div className="bookAppointment">
      <span className="nav">Home &gt; <span className='navActive' >Book Appointments</span></span>
      <div className="menu">
        <div className="menuHeading">Select Category</div>
      </div>
      <div className="bookWrapper">
        {
          isLoading ? "Loading...":
          data.map((item,i)=>{
            let redirect = `/doctor/${item.specialisation}`
            if(memberId !== "")redirect = `/doctor/${item.specialisation}?memberId=${memberId}`
            return(
            <Link to={redirect} key={i} className="specialisations">
              <span className="specName">{item.specialisation}</span>
            </Link>
          )})
        }
      </div>
    </div>
  )
}

export default BookAppointment