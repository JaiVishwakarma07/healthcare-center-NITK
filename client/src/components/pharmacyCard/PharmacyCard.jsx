import React, { useState } from 'react'
import './pharmacyCard.scss'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const PharmacyCard = ({allotment,medicineData}) => {


    // console.log(allotment);
    function findNameById(idToFind) {
      const m = medicineData.find(obj => obj.id === parseInt(idToFind));
      if (m) {
          return m.medicationName;
      } else {
          return idToFind; 
      }
    }

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (newAllotment) => {
            return newRequest.put(`/medicine/allot/${newAllotment}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["medcineAllotment"]);
        },
        onError: (error)=>{
            alert(error.response.data)
        }
        
    });



    const handleAllotment = (id)=>{
      mutation.mutate(id)
    }

  return (
    <div className="pharmacyCard">
        <div className="cardContainer">
        <Accordion className='accordion' >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h1 className='pHeading'>{allotment.memberid !== null ? allotment.memberid : allotment.patientid}</h1>
        </AccordionSummary>
        <AccordionDetails>
            <table className='pharmacyTable'>
                <tbody>
                    <tr className='pTr'>
                        <th className='pTh head' >MEDICINE NAME</th>
                        <th className='pTh head' >DOSAGE</th>
                        <th className='pTh head' >DAYS</th>
                        <th className='pTh head' >TOTAL REQUIRED</th>
                        <th className='pTh head' >ALLOTMENT STATUS</th>
                    </tr>
                    {
                        allotment.data.map((d,i)=>(
                            <tr key={i}>
                                <th className='pTh' >{findNameById(d.medicineid)}</th>
                                <th className='pTh' >{d.dosage}</th>
                                <th className='pTh' >{d.days}</th>
                                <th className='pTh' >{d.totalRequired}</th>
                                <th className='pTh' >{
                                d.alloted === '0' ? 
                                <button onClick={()=>handleAllotment(d.id)} className="allot">Allot </button> :   "Alloted" }
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AccordionDetails>
      </Accordion>
        </div>
    </div>
  )
}

export default PharmacyCard