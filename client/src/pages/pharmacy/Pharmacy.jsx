import React, { useState } from 'react'
import './pharmacy.scss'
import SearchIcon from '@mui/icons-material/Search';
import PharmacyCard from '../../components/pharmacyCard/PharmacyCard'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const Pharmacy = () => {

  const [search,setSearch] = useState("")  

  const {  isLoading, error, data } = useQuery({
    queryKey: ['medicineAllotment'],
    queryFn: () => newRequest.get(`/medicine/allotments`).then((res) => {
        return res.data
    })
  })

  //medicine data
  const { isLoading : mLoading, error:mError, data:mData } = useQuery({
    queryKey: ['medicine'],
    queryFn: () => newRequest.get(`/medicine`).then((res) => {
        return res.data
    })
  })

  const filteredData = data ? data.filter((item) =>
  (((item.patientid ?? '').toLowerCase().includes(search.toLowerCase()) && (item?.memberid === null)) || (((item.memberid ?? '').toLowerCase().includes(search.toLowerCase()) && (item?.memberid !== null))))
) : data;

  // console.log(filteredData2);

  // const filteredData = data ? data.filter((item) =>
  //   (item.patientid ?? '').toLowerCase().includes(search.toLowerCase())
  // ) : data;


  return (
    <div className="pharmacy">
      <div className="pharmacyWrapper">
          <div className="searchContainer">
            <SearchIcon style={{color :"grey",fontSize:"xx-large"}} />
            <input type="text" placeholder='Search' 
            onChange={e=>setSearch(e.target.value)}
             />
          </div>
          {
            isLoading || mLoading ? "Loading" : 
            error ? error : 
            filteredData.map((allotment)=>(
              <PharmacyCard allotment = {allotment} medicineData={mData} key={allotment.reportid} />
            ))
          }
      </div>
  </div>
  )
}

export default Pharmacy