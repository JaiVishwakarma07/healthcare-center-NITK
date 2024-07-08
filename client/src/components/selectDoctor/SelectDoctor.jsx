import React from 'react'
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import "./selectDoctor.scss"
import BookCard from '../bookCard/BookCard';

const SelectDoctor = () => {

    const { search } = useLocation()
    const memberId = search.substring(10)
    const {specialisation} = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ['allDoctorData'],
        queryFn: () => newRequest.get(`/doctor/${specialisation}`).then((res) => {
            return res.data
        })
      })




  return (
    <div className="selectDoctor">
        <span className="nav">Home &gt; <span className='navActive' >Book Appointments</span> &gt; <span className="navActive">{specialisation}</span> </span>
        <div className="menu">
            <h3 className="menuHeading" >Select Doctor </h3>
        </div>
        <div className="docWrapper">
            {isLoading ? "Loading....":
                data.map((doc,i)=>(
                    <BookCard doc={doc} memberId={memberId} key={i} />
                ))
            }
        </div>
    </div>
  )
}

export default SelectDoctor