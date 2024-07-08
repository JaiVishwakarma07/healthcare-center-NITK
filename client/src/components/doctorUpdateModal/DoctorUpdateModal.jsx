import { Modal } from '@mui/material'
import React, { useState } from 'react'
import './doctorUpdateModal.scss'
import Select from 'react-select';
import newRequest from '../../utils/newRequest';
import {useMutation, useQuery,useQueryClient } from "@tanstack/react-query";

const DoctorUpdateModal = ({open,setOpen,data}) => {
    const [days,setDays] = useState([])
    const [time,setTime] = useState([])
    const options = [
        { value: 8, label: 'All' },
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
      ];
    
    const timeSlots= [
        { value: '0', label: 'All Day' },
        { value: '9:00', label: '9:00AM' },
        { value: "9:30", label: '9:30AM' },
        { value: "10:00", label: '10:30AM' },
        { value: "10:30", label: "10:30AM" },
        { value: "11:00", label: "11:00AM" },
        { value: "11:30", label: "11:30AM" },
        { value: "12:00", label: "12:00PM" },
        { value: "12:30", label: "12:30AM" },
        { value: "13:00", label: "01:00PM" },
        { value: "13:30", label: "01:30PM" },
        { value: "14:00", label: "02:00PM" },
        { value: "14:30", label: "02:30PM" },
        { value: "15:00", label: "03:00PM" },
        { value: "15:30", label: "03:30PM" },
        { value: "16:00", label: "04:00PM" },
        { value: "16:30", label: "04:30PM" },
        { value: "17:00", label: "05:00PM" },
    ]

    //   const handleDaysSelect = (option)=>{
    //     setDays(option)
    //     console.log(days);
    //   }

    const queryClient = useQueryClient();

    const dayMutation = useMutation({
      mutationFn: (id) => {
          return newRequest.post(`/doctor/days/${id}`,{days})
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["doctorDays"])
      },
      onError : (error)=>{
        console.log(error);
      }
    })

    const timeMutation = useMutation({
      mutationFn: (id) => {
          return newRequest.post(`/doctor/timeslots/${id}`,{timeslots : time})
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["doctorTime"])
      },
      onError : (error)=>{
        console.log(error);
      }
    })


    // console.log(data);
    const handleSubmit = (e)=>{
        // e.preventDefault()
        if(days.length !== 0 ){
          dayMutation.mutate(data.id)
        }
        else console.log(days.length);
        if(time.length !== 0 ){
          timeMutation.mutate(data.id)
        }
        else console.log(time.length);
        console.log(days,time);
        setOpen(false)
    }

    const handleDayChange = (options)=>{
      let data = []
      options.map((o)=>(data.push(o.value)))
      setDays(data)
      // console.log(days);
    }

    const handleTimeChange = (options)=>{
      let data =[]
      options.map((o)=>(data.push(o.value)))
      setTime(data)
      // console.log(time);
    }
    
  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="updateModalContainer">
        <h2 className="heading">Update Doctor</h2>
        <label>Select Days Avaliable</label>
        <Select
            isMulti
            name="dayselect"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(options)=>handleDayChange(options)}
        />
        <label>Select Time Slots</label>
        <Select
            isMulti
            name="timeselect"
            options={timeSlots}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(options)=>handleTimeChange(options)}
        />
        <button onClick={handleSubmit} >Done</button>
    </div>   
  </Modal>
  )
}

export default DoctorUpdateModal