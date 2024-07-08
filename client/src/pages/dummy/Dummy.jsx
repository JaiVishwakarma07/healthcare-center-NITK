// import './dummy.scss'
import styles from './Dummy.module.css'
import React,{ useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';

const Dummy = () => {
    const componentRef = useRef();
    const [isPrinting, setIsPrinting] = useState(false);

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
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //   });
  return (
    <div className="dummy">
        <div className={styles.prescription} ref={componentRef}>
            <div className={styles.pTop}>
            <h3 className={styles.nitkHeading}>National Institute of Technology Karnataka, Surathkal <br /> Health Care Center </h3>
                <div className={styles.detailContainer}>
                    <div className={styles.left}>
                        <h1 className={styles.doctorName} >Dr. Jai Vishwakarma</h1>
                        <h4 className={styles.item} >Specialisation : Orthoscophy</h4>    
                    </div>
                    <div className={styles.right} >
                    {/* <img src="/images/NITK_logo.png" alt="" /> */}     
                        <h3 className={styles.logoHeading} >Contact <br /> 0824 247 4000</h3>
                    </div>
                </div>
            </div>
            <div className={styles.pMiddle}>
                <div className={styles.medicinesTable} >
                    <h2 className={styles.medicineHeading}>Prescription </h2>
                    <table >
                        <tbody>
                            <tr >
                                <th>Name</th>
                                <th>Dosage</th>
                                <th>Days</th>
                            </tr>
                            <tr>
                                <td>Paracetamol</td>
                                <td>ewdwed</td>
                                <td>Combiflame</td>
                            </tr>
                            <tr>
                                <td>Dolo</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                            <tr>
                                <td>Combiflame</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.testList} >
                    <h2 className={styles.testHeading}>Test Recommended</h2>
                    <ul>
                        <li>blood test</li>
                        <li>MRI</li>
                        <li>CT Scan</li>
                    </ul>
                </div>
            </div>
            <div className={styles.pBottom}>
                <h4 className={styles.sign} >SIGNATURE <br /> Dr. Jai Vishwakarma </h4>
                <div className={styles.address}>
                    <h4  style={{color:"#454545",textAlign:'center'}} >ADDRESS <br />NH 66, Srinivasnagar, Surathkal Mangaluru, Karnataka 575025</h4>
                </div>
            </div>
        </div>
        <button onClick={handlePrint}>Print</button>
    </div>
  )
}

export default Dummy