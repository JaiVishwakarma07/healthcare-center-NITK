import React, { useContext, useEffect, useState } from 'react'
import './appointmentCard.scss'
import {useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import { AuthContext } from '../../context/authContext';

const AppointmentCard = ({appointment,queue}) => {
  const queryClient = useQueryClient();
  const id = appointment.doctorid
  const {currentUser} = useContext(AuthContext)
  let memberName = currentUser.name

  const [isLoading,setIsLoading] = useState(false)
  const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
              setIsLoading(true)
                const res = await newRequest.get(`/doctor/find/${id}`)
                setUser(res.data);
                setIsLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser()
    }, [])

    const [member, setMember] = useState([]);
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        const fetchMember = async () => {
            try {
              setLoading(true)
                const res = await newRequest.get(`/faculty/${appointment.memberId}`)
                setMember(res.data);
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        fetchMember()
    }, [])

    memberName = member?.name

  //delete
  const mutation = useMutation({
    mutationFn: (id) => {
        return newRequest.delete(`/appointment/withdraw/${id}`)
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["appointments"])
    },
    onError : (err)=>{
      console.log(err)
    }
  })

  //delete from queue
  const queueMutation = useMutation({
    mutationFn: (id) => {
        return newRequest.delete(`/appointment/queue/${id}`)
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["queue"])
    }
  })

  const handleAppointmentDelete = (id) => {
    mutation.mutate(id)
    // window.location.reload();
  }

  const handleQueueDelete=(id)=>{
    queueMutation.mutate(id)
    // window.location.reload();
  }

  // console.log(queue);

  return (
    <div className="appointmentCard">
      {isLoading?"Loading...":
        <div className="cardContainer">
          <div className="left">
            <h2 className="heading">Dr. {user.name}</h2>
            <span className="specialisation">Specialisation : {user.specialisation}</span>
            {appointment.isMember ?<span className="specialisation">Appointment for : {memberName}</span> : ""}
          </div>
          <div className="right">
            <span className="date">{appointment.date.toString().substring(0,10)}</span>
            <h1 className="timeSlot">{appointment.timeslot}</h1>
            <button className="delete" onClick={()=> queue ? handleQueueDelete(appointment.id) : handleAppointmentDelete(appointment.id)} >{queue ? "Delete" : "WithDraw"}</button>
          </div>
        </div>
    }
    </div>
  )
}

export default AppointmentCard