import React, { useContext, useEffect, useState } from 'react'
import './doctor.scss'
import { AuthContext } from '../../context/authContext';
import SearchIcon from '@mui/icons-material/Search';
import newRequest from '../../utils/newRequest';
import DoctorCard from '../../components/doctorCard/DoctorCard';
import { useQuery } from '@tanstack/react-query';

const Doctor = () => {

  const [menuActive,setMenuActive] = useState(true)
  const { currentUser } = useContext(AuthContext);

  const [data,setData] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [search,setSearch] = useState("")
  useEffect(()=>{
    const fetchAppointments = async ()=>{
      try {
          setIsLoading(true)
          const res = await newRequest.get(`/appointment?doctorId=${currentUser.id}`)
          setData(res.data);
          setIsLoading(false)
      } catch (err) {
          console.log(err);
      }
    }
    fetchAppointments()
  },[])

  const {  isLoading : qLoading, error, data:qData,refetch } = useQuery({
    queryKey: ['queueDataDoctor'],
    queryFn: () => newRequest.get(`/appointment/queue?doctorId=${currentUser.id}`).then((res) => {
        return res.data
    })
  })

  const filteredData = data ? data.filter((item) =>
  (item.patientid ?? '').toLowerCase().includes(search.toLowerCase())
) : data;

// console.log(error)

  return (
    <div className="doctor">
      <div className="menu">
          <h3 className={menuActive ? "menuHeading active " : "menuHeading"} onClick={()=>{setMenuActive(true); refetch() }} >Scheduled Appointments </h3>
          <h3 className={!menuActive ? "menuHeading active " : "menuHeading"}  onClick={()=>{setMenuActive(false); refetch()}}>Waiting List </h3>
      </div>
      <div className="doctorWrapper">
          {menuActive && <div className="searchContainer">
            <SearchIcon style={{color :"grey",fontSize:"xx-large"}} />
            <input type="text" placeholder='Search' onChange={e=>setSearch(e.target.value)} />
          </div>}
          {menuActive? isLoading ? "loaidn":
              filteredData.map((item)=>(
                <DoctorCard appointment={item} queue={!menuActive} key={item.id}/>
              ))
          :
          qLoading ? "Loading" :qData.length === 0 ? "No Appointments in Waiting Queue": qData.map((item)=>(
            <DoctorCard appointment={item} queue={!menuActive} key={item.id}/>
          ))
          }
      </div>
  </div>
  )
}

export default Doctor