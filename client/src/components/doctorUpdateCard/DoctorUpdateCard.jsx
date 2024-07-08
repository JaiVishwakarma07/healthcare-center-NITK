import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './doctorUpdateCard.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import DoctorUpdateModal from '../doctorUpdateModal/DoctorUpdateModal';

const DoctorUpdateCard = ({data}) => {

    const daysMap = ['Sunday','Monday','TuesDay','Wednesday','Thursday','Friday','Saturday','','All Days']

    const [timeSlots, setTimeSlots] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const [open,setOpen] = useState(false)

    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                setIsLoading(true)
                const res = await newRequest.get(`/doctor/avaliability/time/${data.id}`)
                setTimeSlots(res.data);
                setIsLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        fetchTimeSlots()
    }, [])

    const [days, setDays] = useState([]);
    const [Loading,setLoading] = useState(false)
    useEffect(() => {
        const fetchDays = async () => {
            try {
              setLoading(true)
                const res = await newRequest.get(`/doctor/days/${data.id}`)
                setDays(res.data);
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        fetchDays()
    }, [])

    const queryClient = useQueryClient();

    const timeMutation = useMutation({
        mutationFn: (id) => {
            return newRequest.delete(`/doctor/timeslots/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["doctorTime"])
        },
        onError : (error)=>{
          console.log(error);
        }
      })

      const dayMutation = useMutation({
        mutationFn: (id) => {
            return newRequest.delete(`/doctor/days/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["doctorDays"])
        },
        onError : (error)=>{
          console.log(error);
        }
      })

      //find solution for refetch
    const handleDelete = (id)=>{
        timeMutation.mutate(id)
        window.location.reload();
    }

    const handleDaysDelete = (id)=>{
        dayMutation.mutate(id)
        window.location.reload();
    }

      console.log(data);

  return (
    <div className="doctorUpdateCard">
        <div className="duCardContainer">
            <Accordion className='accordion' >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <div className="duHead">
                    <h1 className='duHeading'>{data.name}</h1>
                    <h3 style={{color:"#959595",fontWeight:"normal"}} >Specialisation : {data.specialisation}</h3>
                </div>
                </AccordionSummary>
                <AccordionDetails className='accDetails' >
                <button onClick={()=>setOpen(true)} >Add</button>
                    <div className="contentContainer">
                        <div className="daysSide">
                            <h3>Days Avaliable</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Days</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        Loading ? "Loading" : 
                                        days.map((d,i)=>(
                                        <tr key={i}>
                                        <td>{daysMap[d.dayvalue]}</td>
                                        <td><button onClick={()=>handleDaysDelete(d.id)} >Delete</button></td>
                                    </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="timeSide">
                            <h3>Time Slots </h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Time Slots</th>
                                        <th>Action</th>
                                    </tr>
                                    {isLoading ? "Loading": timeSlots.length === 0 ? "No Time Slots Added" : 
                                    timeSlots.map((d,i)=>(
                                        <tr key={i} >
                                        <td>{d.timeslot === '0'? "All Day" : d.timeslot}</td>
                                        <td><button onClick={()=>handleDelete(d.id)}  >Delete</button></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
        {open && <DoctorUpdateModal  open={open} setOpen={setOpen} data={data} />}
    </div>
  )
}

export default DoctorUpdateCard