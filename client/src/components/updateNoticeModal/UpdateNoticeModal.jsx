import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const UpdateNoticeModal = ({setOpen,open,prevNotice,id}) => {
    const [notice,setNotice]=useState(prevNotice)

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (notice) => {
            return newRequest.put(`/notice/${id}`,notice)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["notice"])
        },
        onError : (error)=>{
          console.log(error);
        }
      })

    const handleUpdate = ()=>{
        mutation.mutate({notice})
        setOpen(false)
    }


    console.log(id);

  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="addModalContainer">
        <div className="addNotice">
            <h2 className="anHeading">Update Notice</h2>
        </div>
        <textarea cols="30" rows="10" placeholder='Notice' defaultValue={prevNotice} onChange={(e)=>setNotice(e.target.value)}></textarea>
        <div className="buttonContainer">
            <button className="done" onClick={handleUpdate}>Update</button>
        </div> 
    </div>
    
  </Modal>
  )
}

export default UpdateNoticeModal