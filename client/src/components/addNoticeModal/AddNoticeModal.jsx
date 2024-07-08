import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import "./addNoticeModal.scss"

const AddNoticeModal = ({setOpen,open}) => {
    const [notice,setNotice]=useState("")


    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (notice) => {
            return newRequest.post(`/notice`,notice)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["notice"])
        },
        onError : (error)=>{
          console.log(error);
        }
      })

    const handleAdd = ()=>{
        mutation.mutate({notice})
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
        <div className="addNotice">
            <h2 className="anHeading">Add Notice</h2>
        </div>
        <textarea cols="30" rows="10" placeholder='Notice' onChange={(e)=>setNotice(e.target.value)}></textarea>
        <div className="buttonContainer">
            <button className="done" onClick={handleAdd}>Add</button>
        </div> 
    </div>
    
  </Modal>
  )
}

export default AddNoticeModal