import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import './uploadModal.scss'
import newRequest from '../../utils/newRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UploadModal = ({open,dataId,refetch,setOpen}) => {

  const [quantity,setQuantity] = useState(0)
  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: (quantity) => {
          return newRequest.put(`/pharmacy/${dataId}`,quantity);
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["pharmacy"]);
      },
      onError: (error)=>{
          console.log(error);
      }
      
  });
  const handleUpdate = (e)=>{
    mutation.mutate({quantity})
    refetch()
    setOpen(false)
  }
  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="modalContainer">
        <div className="update">
            <h2 className="updateHeading">Update Quantity</h2>
        </div>
        <input type="number" placeholder='Quantity' onChange={(e)=>setQuantity(e.target.value)} />
        <div className="buttonContainer">
            <button className="done" onClick={handleUpdate}>Update</button>
        </div> 
    </div>
    
  </Modal>
  )
}

export default UploadModal