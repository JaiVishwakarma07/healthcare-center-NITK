import React, { useState } from 'react'
import {useLocation, useParams} from 'react-router-dom'
import './diagnosis.scss'
import { useQuery } from "@tanstack/react-query";
import ReviewModal from '../../components/reviewModal/ReviewModal';
import newRequest from '../../utils/newRequest';
import CreatableSelect from 'react-select/creatable';

const Diagnosis = () => {
    
    const [open,setOpen] = useState(false)
    const { search } = useLocation()
    const memberid = search.substring(10);
    // console.log(memberid === 'null');
    const {id,patientid} = useParams()
    const [formFieldsMeds, setFormFieldsMeds] = useState([
        { medicine: '', dosage: '',days: '' },
      ])
    const [formTestFields, setFormTestFields] = useState([
        { test: '' },
    ])

    const dataArrayDosage = [
      {value : '1-1-1',label : '1-1-1'},
      {value : '1-0-1',label : '1-0-1'},
      {value : '0-1-0',label : '0-1-0'},
      {value : '0-0-0',label : '0-0-0'}
  ]

    const [diagnosis,setDiagnosis] = useState("")
    const [remarks,setRemarks] = useState("")
    
    
      const handleMedsFormChange = (event, index) => {
        let data = [...formFieldsMeds];
        data[index][event.target.name] = event.target.value;
        setFormFieldsMeds(data);
      }

      const handleCreatableSelectMedicine = (selectedOption,index)=>{
        let data = [...formFieldsMeds];
        data[index]['medicine'] = selectedOption.value;
        setFormFieldsMeds(data);
      }

      const handleCreatableSelectDosage = (selectedOption,index)=>{
        let data = [...formFieldsMeds];
        data[index]['dosage'] = selectedOption.value;
        setFormFieldsMeds(data);
      }

    
      const handleMedsSubmit = (e) => {
        e.preventDefault();
        console.log(formFieldsMeds)
      }
    
      const addMedsFields = () => {
        let object = {
          medicine: '',
          dosage: '',
          days: ''
        }
    
        setFormFieldsMeds([...formFieldsMeds, object])
      }
    
      const removeMedsFields = (index) => {
        let data = [...formFieldsMeds];
        data.splice(index, 1)
        setFormFieldsMeds(data)
      }

      const { isLoading, error, data } = useQuery({
        queryKey: ['medicine'],
        queryFn: () => newRequest.get(`/medicine`).then((res) => {
            return res.data
        })
      })
    
      // console.log(data);
      let dataArrayMedicine = []
      if(!isLoading){
        data.map((d)=>(dataArrayMedicine.push({
          value : d.id,label : d.medicationName
        })))
      }
      // console.log(typeof(formFieldsMeds[1].medicine));
    //test

    
      const handleTestFormChange = (event, index) => {
        let data = [...formTestFields];
        data[index][event.target.name] = event.target.value;
        setFormTestFields(data);
      }
    
      const handleTestSubmit = (e) => {
        e.preventDefault();
        console.log(formTestFields)
      }
    
      const addTestFields = () => {
        let object = {
          test : ''
        }
    
        setFormTestFields([...formTestFields, object])
      }
    
      const removeTestFields = (index) => {
        let data = [...formTestFields];
        data.splice(index, 1)
        setFormTestFields(data)
      }
    
    

  return (
    <div className="diagnosis">
    <span className="nav">Appointments &gt; <span className='navActive' >Diagnosis</span></span>
    <div className="diagnosisContainer">
        <h1 className="heading">{memberid==='null' ? patientid : memberid}</h1>
        <h3>{memberid !== 'null' && `FacultyID : ${patientid}`}</h3>
        <div className="diagnosisWrapper">
            <div className="formDiagnosis">
                <label htmlFor="">Treatment</label>
                <input type="text" placeholder='Treatment' onChange={e=>setDiagnosis(e.target.value)} />
                <label htmlFor="">Remarks</label>
                <textarea name="" placeholder='Remarks' id="" cols="30" rows="5" onChange={e=>setRemarks(e.target.value)} ></textarea>
            </div>
            <div className="otherForms">
                <div className="form">
                    <label className="subHeading">Medications</label>
                    {/* <CreatableSelect isClearable name='jai' options={dataArrayMedicine} onChange={(e)=>console.log(e)}  /> */}
                    <form className='formContaiiner' onSubmit={handleMedsSubmit}>
                        {formFieldsMeds.map((form, index) => {
                        return (
                            <div className='formWrapper' key={index}>
                                {/* <select className='input' value={form.medicine} name="medicine" placeholder='medicine'
                                    onChange={event => handleMedsFormChange(event, index)}
                                    id="">
                                
                                    <option value="select">Select option</option>
                                    {
                                      isLoading? "loading...":
                                    data.map((d)=>(
                                      <option key={d.id} value={d.id}>{d.medicationName}</option>
                                    ))
                                    }
                                </select> */}
                                <CreatableSelect
                                  className='inputCreate'
                                  placeholder='Medicine'
                                  name='medicine' 
                                  options={dataArrayMedicine} 
                                  onChange={(option)=>handleCreatableSelectMedicine(option,index)}
                                 />
                                <CreatableSelect
                                  className='inputCreate'
                                  placeholder='Dosage'
                                  name='dosage'
                                  options={dataArrayDosage}
                                  onChange={(option)=>handleCreatableSelectDosage(option,index)}
                                />
                                {/* <input
                                    className='input'
                                    name='dosage'
                                    placeholder='Dosage'
                                    onChange={event => handleMedsFormChange(event, index)}
                                    value={form.dosage}
                                /> */}
                                <input
                                className='input'
                                    name='days'
                                    placeholder='Days'
                                    onChange={event => handleMedsFormChange(event, index)}
                                    value={form.days}
                                />
                                <button className='remove' onClick={() => removeMedsFields(index)}>Remove</button>
                            </div>
                        )
                        })}
                    </form>
                    <button className='add' onClick={addMedsFields}>Add More..</button>
                </div>
                
                <div className="form">
                    <label className="subHeading">Tests</label>
                    <form className='formContaiiner' onSubmit={handleTestSubmit}>
                        {formTestFields.map((form, index) => {
                        return (
                            <div className='formWrapper' key={index}>
                            <input
    
                                name='test'
                                className='input'
                                placeholder='Test'
                                onChange={event => handleTestFormChange(event, index)}
                                value={form.test}
                            />
                            <button className='remove' onClick={() => removeTestFields(index)}>Remove</button>
                            </div>
                        )
                        })}
                    </form>
                    <button className='add' onClick={addTestFields}>Add More..</button>
                </div>
            </div>
            
        </div>
        <button onClick={()=>setOpen(true)} className="review">Review</button>
    </div>
        {isLoading ? "" :
        <ReviewModal 
          open={open}  
          setOpen={setOpen} 
          medicineData = {data} 
          appointmentId={id}  
          patientid={patientid} 
          memberid = {memberid}
          diagnosis={diagnosis} 
          remarks={remarks} 
          formFieldsMeds={formFieldsMeds} 
          formTestFields={formTestFields} 
        />}
</div>
  )
}

export default Diagnosis