import React, { useContext, useEffect, useRef, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import newRequest from '../../utils/newRequest';
import {useNavigate} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../../context/authContext';
import BookingTimeSelect from '../bookingTimeSelect/BookingTimeSelect';


const BookCard = ({doc,memberId}) => {

    const [date,setDate] = useState("2023-04-23")
    const [timeSlot,setTimeSlot] = useState("")
    // const [memberId,setMemberId] = useState("")
    const doctorid = doc.id
    const navigate = useNavigate()

    const {ref} = useRef()
    // const d = new Date()
    // console.log(d.getMinutes());
    // const defaultMember = 0

    // console.log(date);

    const {currentUser} = useContext(AuthContext)

    const queryClient = useQueryClient();

    // let disable = []
    const [loading,setLoading] = useState(false)
    const [avaliability,setAvaliability] = useState([])
    // useEffect(()=>{refetch()},[date])

    // const { isLoading : timeLoading, error : timeerror, data: timeAvaliability } = useQuery({
    //     queryKey: ['timeAvaliability'],
    //     queryFn: () => newRequest.get(`/doctor/avaliability/time/${doctorid}`).then((res) => {
    //         return res.data
    //     })
    //   })

    useEffect(() => {
        const fetchAvaliability = async () => {
            try {
                setLoading(true)
                const res = await newRequest.get(`/doctor/avaliability/${doctorid}`)
                setAvaliability(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAvaliability()
    }, [])

    const { isLoading, error, data } = useQuery({
        queryKey: ['faculty'],
        queryFn: () => newRequest.get(`/user/find/facultymembers/${currentUser.id}`).then((res) => {
            return res.data
        })
      })

    // const { isLoading : bookedLoading, error : bookedError, data : bookedTimeSlots,refetch } = useQuery({
    //     queryKey: ['bookedTimeSlots'],
    //     queryFn: () => newRequest.get(`/appointment/timeslots/${date}`).then((res) => {
    //         return res.data
    //     })
    //   })

    //   console.log(data);4
    // console.log(doctorid);

    const timeArray = [
        {timeslot : "Morning"},
        {timeslot : "Day"},
        {timeslot : "Evening"}
    ]



    const mutation = useMutation({
        mutationFn: (newAppointment) => {
            return newRequest.post("/appointment/book", newAppointment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["appointments"]);
        },
        onError: (error)=>{
            console.log(error);
        }
        
    });

    const handleSubmit=async (e)=>{
        e.preventDefault()
        let text 
        console.log(memberId);
        if(memberId === ""){
            text = {doctorid,date,timeslot:timeSlot}
            // console.log("not a member");
        }
        else text = {doctorid,date,timeslot:timeSlot,isMember : 1,memberId}
        mutation.mutate(text)
        navigate('/myappointments')
    }

  return (
    <div className="docCard"  >
        <div className="cardContainer">
        <div className="left">
            <h2 className="heading">Dr. {doc.name}</h2>
            <span className="specialisation">Specialisation : {doc.specialisation}</span>
        </div>
        <div className="right">
            <form className='bookingForm' onSubmit={handleSubmit} >
                {loading ? "": <DatePicker 
                    disablePast={true}  
                    onChange={(newvalue)=>setDate(newvalue.format('YYYY-MM-DD').toString())}  
                    inputFormat='yyyy-MM-dd' 
                    shouldDisableDate={(date)=>{
                        if(avaliability[0] === 8)return false
                        const day = date.day()
                        return !avaliability.includes(day)
                    }}
                />}
                <div>
                    <BookingTimeSelect setTimeSlot={setTimeSlot} timeArray={timeArray} date={date} doctorid={doctorid} />
                {/* <select  className='timePicker' defaultValue="7am"  onChange={(e)=>setTimeSlot(e.target.value)}>
                    {timeLoading || bookedLoading ? "loading" : timeAvaliability[0]?.timeslot === '0' ? 
                    timeArray.map((t,i)=>{
                        const isBooked = bookedTimeSlots?.includes(t.timeslot)
                        return (
                        <option value={t.timeslot} key={i} >{t.timeslot} {isBooked ? "Q" : ""} </option>
                    )}):
                    timeAvaliability.map((t,i)=>{
                        const isBooked = bookedTimeSlots?.includes(t.timeslot)
                        return (
                        <option value={t.timeslot} key={i} >{t.timeslot} {isBooked ? "Q" : ""}</option>
                    )})
                    }
                </select> */}
                </div>
                {/* {
                    currentUser.userType === "Faculty" && 
                    <select name="" id="" className="timePicker" onChange={(e)=>setMemberId(e.target.value)} >
                        <option value="">Self</option>
                        {
                            isLoading ? "":
                            data.map((member)=>(
                                <option value={member.id} key={member.id} >{member.name}</option>
                            ))
                        }
                    </select>
                } */}
                <button type='submit' className="select">Book Appointment</button>
            </form>

            {/* <Link to={`/appointmentForm?doctor=${doc.id}`} className="select" >Select</Link> */}
            </div>
        </div>
    </div>
  )
}

export default BookCard