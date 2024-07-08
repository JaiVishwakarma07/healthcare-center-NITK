import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import newRequest from '../../utils/newRequest'

const BookingTimeSelect = ({setTimeSlot,timeArray,date,doctorid}) => {

  const [timeLoading,setTimeLoading] = useState(false)
  const [timeAvaliability,setTimeAvaliability] = useState([])

  const [bookedLoading,setBookedLoading] = useState(false)
  const [bookedTimeSlots,setBookedTimeSlots] = useState([])

    useEffect(()=>{
      const fetchTimeAvaliability = async()=>{
        try {
          setTimeLoading(true)
          const res = await newRequest.get(`/doctor/avaliability/time/${doctorid}`)
          setTimeAvaliability(res.data)
          setTimeLoading(false)
        } catch (error) {
          console.log(error);
        }
      }
      fetchTimeAvaliability()
    },[date])

    // const { isLoading : timeLoading, error : timeerror, data: timeAvaliability } = useQuery({
    //     queryKey: ['timeAvaliability'],
    //     queryFn: () => newRequest.get(`/doctor/avaliability/time/${doctorid}`).then((res) => {
    //         return res.data
    //     })
    //   })

    useEffect(()=>{
      const fetchBookedSlots = async()=>{
        try {
          setBookedLoading(true)
          const res = await newRequest.get(`/appointment/timeslots/${date}`)
          setBookedTimeSlots(res.data)
          setBookedLoading(false)
        } catch (error) {
          console.log(error);
        }
      }
      fetchBookedSlots()
    },[date])
      
      
    // const { isLoading : bookedLoading, error : bookedError, data : bookedTimeSlots,refetch } = useQuery({
    //     queryKey: ['bookedTimeSlots'],
    //     queryFn: () => newRequest.get(`/appointment/timeslots/${date}`).then((res) => {
    //         return res.data
    //     })
    //   })
 
      const currentTime = new Date()
      const targetDate= new Date(date)
      targetDate.setHours(0, 0, 0, 0)
      
      const filteredTimes = timeAvaliability?.filter(time => {
        const currentDate = currentTime.setHours(0, 0, 0, 0)
        if(time.timeslot!=undefined ){
          if(currentDate === targetDate){
            const [hours, minutes] = time.timeslot.split(':').map(Number);
            const timeToCompare = new Date();
            timeToCompare.setHours(hours, minutes, 0); // Set hours, minutes, and seconds to 0 for comparison
            return timeToCompare >= currentTime;
          }
          else return true
        }
        else return false
      });

      // const filteredTimes2 = timeArray.filter(time => {
      //   const currentDate = currentTime.setHours(0, 0, 0, 0)
      //   if(time.timeslot!=undefined ){
      //     if(currentDate === targetDate){
      //       const [hours, minutes] = time.timeslot.split(':').map(Number);
      //       const timeToCompare = new Date();
      //       timeToCompare.setHours(hours, minutes, 0); // Set hours, minutes, and seconds to 0 for comparison
      //       return timeToCompare >= currentTime;
      //     }
      //     else return true
      //   }
      //   else return false
      // });

  return (
    <select  className='timePicker' defaultValue="7am"  onChange={(e)=>setTimeSlot(e.target.value)}>
    {timeLoading || bookedLoading ? "loading" : timeAvaliability[0]?.timeslot === '0' ? 
    timeArray.map((t,i)=>{
        const isBooked = bookedTimeSlots?.includes(t.timeslot)
        return (
        <option
        //  style={isBooked ? {color : "red"} : {color:"black"}} 
         value={t.timeslot} key={i} >{t.timeslot}
          {/* {isBooked ? "Q" : ""}  */}
          </option>
    )}):
    filteredTimes.map((t,i)=>{
        const isBooked = bookedTimeSlots?.includes(t.timeslot)
        return (
        <option style={isBooked ? {color : "red"} : {color:"black"}} value={t.timeslot} key={i} >{t.timeslot} {isBooked ?  "Q": ""}</option>
    )})
    }
</select>
  )
}

export default BookingTimeSelect