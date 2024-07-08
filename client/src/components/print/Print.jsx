import React, { forwardRef, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import styles from './Print.module.css'


const Print = forwardRef(({medicine,medicineData,test},ref) => {
    const {currentUser} = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ['doctor'],
        queryFn: () => newRequest.get(`/doctor/find/${currentUser.id}`).then((res) => {
            return res.data
        })
      })

    let newDate = new Date()
    let date = newDate.getDate() + '-' + newDate.getMonth() + '-' + newDate.getFullYear() ;
    // console.log(error);
    
  return (
    <div className="print" style={{display : "none"}}>
        <div className={styles.prescription} ref={ref}>
            <div className={styles.pTop}>
            <h3 className={styles.nitkHeading}>National Institute of Technology Karnataka, Surathkal <br /> Health Care Center </h3>
                <div className={styles.detailContainer}>
                    <div className={styles.left}>
                        <h1 className={styles.doctorName} >Dr. {currentUser.name}</h1>
                        {isLoading ? "Loading" : <h4 className={styles.item} >Specialisation : {data.specialisation}</h4>}
                    </div>
                    <div className={styles.right} >
                    {/* <img src="/images/NITK_logo.png" alt="" /> */}     
                        <h3 className={styles.logoHeading}>Contact <br /> 0824 247 4000</h3>
                    </div>
                </div>  
            </div>
            <div className={styles.pMiddle}>
                <h4 className={styles.date}>Date : {date}</h4>
                {medicine[0].medicine === '' ? "" :  <div className={styles.medicinesTable} >
                    <h2 className={styles.medicineHeading}>Prescription </h2>
                    <table>
                        <tbody>
                            <tr >
                                <th>Name</th>
                                <th>Dosage</th>
                                <th>Days</th>
                            </tr>
                            {medicine.map((med,i)=>(
                            <tr key={i}>
                                <td>{ typeof(med.medicine) === 'string' ? med.medicine : medicineData.find(obj => obj.id === parseInt(med.medicine)).medicationName}</td>
                                <td>{med.dosage}</td>
                                <td>{med.days}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>}
                {test[0].test === '' ? "" : <div className={styles.testList}>
                    <h2 className={styles.testHeading}>Test Recommended</h2>
                    <ul>
                        {
                            test.map((test,i)=>(
                                <li key={i}>{test.test}</li>
                            ))
                        }
                        
                    </ul>
                </div>}
            </div>
            <div className={styles.pBottom}>
                <h4 className={styles.sign} >SIGNATURE <br /> Dr. {currentUser.name} </h4>
                <div className={styles.address}>
                    <h4  style={{color:"#454545",textAlign:'center'}} >ADDRESS <br />NH 66, Srinivasnagar, Surathkal Mangaluru, Karnataka 575025</h4>
                </div>
            </div>
        </div>
    </div>
  )
})


export default Print