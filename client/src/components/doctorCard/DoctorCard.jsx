import React, { useEffect, useState } from 'react'
import newRequest from '../../utils/newRequest';
import './doctorCard.scss'
import {Link} from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';

const DoctorCard = ({appointment,queue}) => {

    const queryClient = useQueryClient();
    const [isLoading,setIsLoading] = useState(false)
    const [user, setUser] = useState([]);
    let url  = `/user/find/${appointment.patientid}`
    if(appointment.isMember === 1){
        url = `/faculty/${appointment.memberId}`
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
              setIsLoading(true)
                const res = await newRequest.get(url)
                setUser(res.data);
                setIsLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser()
    }, [])

    const mutation = useMutation({
      mutationFn: (id) => {
          return newRequest.post(`/appointment/approve/${id}`)
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["queueDoctor"])
      },
      onError:(err)=>{
        console.log(err);
      }
    })

    const handleApprove = (e)=>{
      e.preventDefault()
      mutation.mutate(appointment.id)
    }

    //cancel appointment
    const deleteMutation = useMutation({
      mutationFn: (id) => {
          return newRequest.delete(`/appointment/${id}`)
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["appointmentsDoctor"])
      },
      onError:(err)=>{
        console.log(err);
      }
    })
    const handleCancel = (e)=>{
      e.preventDefault()
      deleteMutation.mutate(appointment.id)
      window.location.reload(); 
    }

    //delete from queue
    const queueMutation = useMutation({
      mutationFn: (id) => {
          return newRequest.delete(`/appointment/queue/${id}`)
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["queueDoctor"])
      },
      onError:(err)=>{
        console.log(err);
      }
    })

    const handleQueueCancel = (e)=>{
      e.preventDefault()
      queueMutation.mutate(appointment.id)
    }




  return (
    <div className="doctorCard">
        <div className="cardContainer">
          <div className="left">
            {isLoading ? "Loading.." : <h1 className="heading">{user.name}</h1>}
            <span className="date">{appointment.date}</span>
            <h1 className="timeSlot">{appointment.timeslot}</h1>
          </div>
          <div className="right">
            <button onClick={queue ? handleQueueCancel : handleCancel} className='button cancel'>Cancel</button>
            {queue &&  <button onClick={handleApprove} className='button'>Approve</button>}
           { isLoading ?  "" : queue ? "" :  <Link to={`/diagnosis/${appointment.id}/${appointment.patientid}?memberid=${appointment.memberId}`} className='button' >Diagnos</Link>  }
            {/* <button className="button" onClick={()=> queue ? handleQueue(appointment.id) : handleAppointment(appointment.id)} >{queue ? "Approve" : "Diagnos"}</button> */}
          </div>
        </div>
    </div>
  )
}

export default DoctorCard