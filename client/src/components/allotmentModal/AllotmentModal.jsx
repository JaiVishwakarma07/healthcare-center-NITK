import React from 'react'
import Modal from '@mui/material/Modal';

const UploadModal = ({open,setOpen}) => {
  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="modalContainer">
        <div className="allotMedicine">
            <h2 className="allotMedicineHeading">Allot Medicine</h2>
        </div>

        <div className="buttonContainer">
            <button className="done" >Allot</button>
        </div> 
    </div>
    
  </Modal>
  )
}

export default UploadModal