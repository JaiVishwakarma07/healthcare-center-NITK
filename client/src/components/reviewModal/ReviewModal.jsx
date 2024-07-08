import React,{ useEffect, useRef, useState } from 'react'
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useReactToPrint } from 'react-to-print';
import './reviewModal.scss'
import Print from '../print/Print';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';


const ReviewModal = (
    {
        open,
        setOpen,
        medicineData,
        appointmentId,
        patientid,
        memberid,
        diagnosis,
        remarks,
        formFieldsMeds,
        formTestFields
    }) => {

    //print
    const componentRef = useRef();
    const [isPrinting, setIsPrinting] = useState(false);
    const navigate = useNavigate()

    // console.log(memberid);

    const promiseResolveRef = useRef(null);

    useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
        promiseResolveRef.current();
    }
    }, [isPrinting]);

    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
        return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
        });
    },
    onAfterPrint: () => {
        promiseResolveRef.current = null;
        setIsPrinting(false);
    }
    });

    // console.log(typeof(formFieldsMeds));
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (newReport) => {
            return newRequest.post("/report", newReport);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reports"]);
        },
        onError: (error)=>{
            console.log(error);
        }
        
    });
    const appointmentMutation = useMutation({
        mutationFn: (id) => {
            return newRequest.delete(`/appointment/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reports"]);
        },
        onError: (error)=>{
            console.log(error);
        }
        
    });
    const filterMeds = formFieldsMeds.filter((item)=>(
        typeof(item.medicine) === 'number'
    ))

    console.log(filterMeds);

    const handleSubmit=async (e)=>{
        e.preventDefault()
        let report ,isMember = 1;
        if(memberid === 'null')report = {patientid,diagnosis,remarks,filterMeds,formTestFields}
        else report = {patientid,diagnosis,remarks,formFieldsMeds,formTestFields,isMember,memberid}
        mutation.mutate(report)
        appointmentMutation.mutate(appointmentId)
        navigate('/')
    }

    // console.log(filterMeds);
    function findNameById(idToFind) {
        // Use the find method to search for the object with the matching id
        if(typeof(idToFind) === 'string')return idToFind
        const m = medicineData.find(obj => obj.id === parseInt(idToFind));
        if (m) {
            return m.medicationName;
        } else {
            return idToFind; // Return a default value if the id is not found
        }
    }

  return (
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="reviewModalContainer">
            <div className="review">
                <h2 className="reviewText">Review CheckUp</h2>
            </div>
            <h4 className="content"><span>Treatment</span> : {diagnosis}</h4>
            <p className="content"><span>Remarks</span> : {remarks}</p>
            {/* list of Medications
            list of test */}
            {formFieldsMeds[0].medicine === '' ? "" :<div className="tableContainer">
                  <h3 className="tableHeading">Medications</h3>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Medicine</TableCell>
                          <TableCell align="right">Dosage</TableCell>
                          <TableCell align="right">Days</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formFieldsMeds.map((meds) => (
                          <TableRow key={meds.medicine}>
                            <TableCell component="th" scope="row">
                              {findNameById(meds.medicine)}
                            </TableCell>
                            <TableCell align="right">{meds.dosage}</TableCell>
                            <TableCell align="right">{meds.days}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
            </div>}
            {formTestFields[0].test === '' ? "" :  <div className="listContainer">
                <h3 className="listHeading">Test Recommended</h3>
                <ul>
                    {
                        formTestFields.map((item)=>(
                            <li key={item.test} >{item.test}</li>
                        ))
                    }
                </ul>
            </div> }  
            <div className="buttonContainer">
                {formFieldsMeds[0].medicine === '' && formTestFields[0].test === '' ? "" :
                    <button className="print" onClick={handlePrint}>Get Prescription</button>}
                <button className="done"  onClick={handleSubmit}>Done</button>
            </div> 
              <Print medicine={formFieldsMeds} medicineData = {medicineData} test={formTestFields} ref={componentRef} />
        </div>
        
      </Modal>

  )
}

export default ReviewModal