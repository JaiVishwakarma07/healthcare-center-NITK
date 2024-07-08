import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import newRequest from '../../utils/newRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './addMedicine.scss'

const AddMedincine = ({open,setOpen}) => {

  const [medicationName,setMedicationName] = useState("")
  const [description,setDescription] = useState("")
  const [quantity,setQuantity] = useState(0)

  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: (medicine) => {
          return newRequest.post(`/pharmacy`,medicine);
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["pharmacy"]);
      },
      onError: (error)=>{
          console.log(error);
      }
      
  });

  const handleSubmit = (e)=>{
    e.preventDefault()
    mutation.mutate({medicationName,description,quantity})
    setOpen(false)
  }

  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="addModalContainer">
        <div className="addMedicine">
            <h2 className="addMedicineHeading">Add Medicine</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Medicine Name' onChange={e=>setMedicationName(e.target.value)} />
          <input type="text" placeholder='Description' onChange={e=>setDescription(e.target.value)} />
          <input type="number" placeholder='Quantity' onChange={e=>setQuantity(e.target.value)} />
          <button type='submit' className="done" >Add</button>
        </form>
    </div>
    
  </Modal>
  )
}

export default AddMedincine