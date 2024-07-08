import React, { useContext, useState } from 'react'
import './appointments.scss'
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import { AuthContext } from '../../context/authContext';
import AppointmentCard from '../../components/appointmentCard/AppointmentCard';

const Appointments = () => {

    const { currentUser } = useContext(AuthContext);
    const [menuActive,setMenuActive] = useState(true)

    const { isLoading, error, data,refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => newRequest.get(`/appointment?patientId=${currentUser.id}`).then((res) => {
            return res.data
        })
    })
    const { isLoading : qLoading, error:qError, data:qData,refetch:qRefetch } = useQuery({
        queryKey: ['queue'],
        queryFn: () => newRequest.get(`/appointment/queue?patientId=${currentUser.id}`).then((res) => {
            return res.data
        })
    })

  return (
    <div className="appointments">
        <span className="nav">Home &gt; <span className='navActive' >My Appointments</span></span>
        <div className="menu">
            <h3 className={menuActive ? "menuHeading active " : "menuHeading"} onClick={()=>{setMenuActive(true); refetch()}} >Scheduled </h3>
            <h3 className={!menuActive ? "menuHeading active " : "menuHeading"}  onClick={()=>{setMenuActive(false); qRefetch()}}>Queue </h3>
        </div>
        <div className="appointmentWrapper">
            {menuActive?
                isLoading? "Loading....": data.length === 0 ? "No Appointments Scheduled":
                data.map((appointment)=>(
                    <AppointmentCard appointment={appointment} queue={!menuActive} key={appointment.id} />
                ))
            :
            qLoading? "Loading....": qData.length === 0 ? "No Appointments in Waiting Queue":
                qData.map((qAppointment)=>(
                    <AppointmentCard appointment={qAppointment} queue={!menuActive} key={qAppointment.id} />
                ))
            }
        </div>
    </div>
  )
}

export default Appointments