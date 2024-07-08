import React, { useState } from 'react'
import DoctorUpdateModal from '../../components/doctorUpdateModal/DoctorUpdateModal'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import DoctorUpdateCard from '../../components/doctorUpdateCard/DoctorUpdateCard'
import SearchIcon from '@mui/icons-material/Search';
import './updateDoctor.scss'

const UpdateDoctor = () => {

  const [search,setSearch] = useState('')
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['doctorData'],
    queryFn: () => newRequest.get(`/doctor`).then((res) => {
        return res.data
    })
  })

  const filteredData = data ? data.filter((item) =>
  (item.id ?? '').toLowerCase().includes(search.toLowerCase())
) : data;
  // console.log(error);
  
  // in update modal add table of date and time slots for particular doctor and update them also give add button to add new time slot

  return (
    <div className="updateDoctor">
      {/* list of doctors */}
      {/* modal to update doctor */}
      <h1 className='udHeading' >Update Doctor Details</h1>
      <div className="updateDoctorWrapper">
        <div className="searchContainer">
          <SearchIcon style={{color :"grey",fontSize:"xx-large"}} />
          <input type="text" placeholder='Enter Doctor ID to Search' onChange={(e)=>setSearch(e.target.value)} />
        </div>
        {
          isLoading ? "Loading" :
          filteredData.map((d)=>(
            <DoctorUpdateCard data={d} key={d.id} />
            // <div key={d.id} className="doctorDisplayCard">
            //   <div className="leftDDC">
            //     <h2 className="ddcHeading">Dr {d.name}</h2>
            //     <h3 className="sub">ID : {d.id}</h3>
            //   </div>
            //   <button onClick={()=>setOpen(true)}>Update</button>
            // </div>
          )) 
          
        }
      </div>
      {/* {!isLoading && } */}
    </div>
  )
}


export default UpdateDoctor