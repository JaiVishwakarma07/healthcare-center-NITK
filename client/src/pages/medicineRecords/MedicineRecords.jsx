import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './medicalRecords.scss'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import UploadModal from '../../components/updateModal/UploadModal';
import AddMedincine from '../../components/addMedicine/AddMedicine';

const MedicineRecords = () => {

  const [search,setSearch] = useState("")
  const [open,setOpen] = useState(false)
  const [medicineId,setMedicineId] = useState(0)
  const [openAdd,setOpenAdd] = useState(false)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['medicine'],
    queryFn: () => newRequest.get(`/medicine`).then((res) => {
        return res.data
    })
  })



  const filteredData = data ? data.filter((item) =>
  (item.medicationName ?? '').toLowerCase().includes(search.toLowerCase())
  ) : data;


  
  return (
    <div className="medicalRecords">
      <div className="recordsWrapper">
        <div className="topContainer">
          <div className="searchContainer">
            <SearchIcon style={{color :"grey",fontSize:"xx-large"}} />
            <input type="text" placeholder='Search' 
            onChange={e=>setSearch(e.target.value)}
             />
          </div>
          <button className="add" onClick={()=>setOpenAdd(true)}>Add</button>
        </div>
          <table className='pharmacyTable'>
            <tbody>
                <tr className='pTr'>
                  <th className='pTh head' >MEDICINE NAME</th>
                  <th className='pTh head' >DESCRIPTION</th>
                  <th className='pTh head' >QUANTITY</th>
                  <th className='pTh head' >STATUS</th>
                  <th className='pTh head' >UPDATE</th>
                </tr>
                {isLoading ? "Loading" :   
                filteredData.map((medicine)=>(
                  <tr key={medicine.id}>
                    <th className='pTh' >{medicine.medicationName}</th>
                    <th className='pTh' >{medicine.description}</th>
                    <th className='pTh' >{medicine.quantity}</th>
                    <th className='pTh' >{medicine.status}</th>
                    <th className='pTh' ><button onClick={()=>{setOpen(true);setMedicineId(medicine.id)}}  className='update' >Update</button></th>   
                  </tr> 
                )) }
            </tbody>
          </table>
      </div>
      {openAdd && <AddMedincine open={openAdd} setOpen={setOpenAdd} />}
      {open && <UploadModal open={open} dataId={medicineId} refetch={refetch} setOpen={setOpen} />}
  </div>
  )
}

export default MedicineRecords