import React, { useContext, useEffect, useState } from 'react'
import newRequest from '../../utils/newRequest';
import './reportCard.scss'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';

const ReportCard = ({report,medicineData}) => {

    const [isLoading,setIsLoading] = useState(false)
    const [mLoading,setMLoading] = useState(false)
    const [member,setMember] = useState('')
    const [doctor, setDoctor] = useState([]);
    const {currentUser} = useContext(AuthContext)
    const id  = report.doctorid
      useEffect(() => {
          const fetchDoctor = async () => {
              try {
                setIsLoading(true)
                  const res = await newRequest.get(`/doctor/find/${id}`)
                  setDoctor(res.data);
                  setIsLoading(false)
              } catch (err) {
                  console.log(err);
              }
          }
          fetchDoctor()
      }, [])

      useEffect(() => {
        const fetchMember = async () => {
            try {
              setMLoading(true)
                const res = await newRequest.get(`/faculty/${report.memberid}`)
                setMember(res.data);
                setMLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        fetchMember()
    }, [])



      const { isLoading : Loading, error, data, refetch } = useQuery({
        queryKey: ['medicineAllocationData'],
        queryFn: () => newRequest.get(`/medicine/allotments`).then((res) => {
            return res.data
        })
      })

      const { isLoading : tLoading, error : tError, data : testData } = useQuery({
        queryKey: ['testData'],
        queryFn: () => newRequest.get(`/medicine/tests/${report.id}`).then((res) => {
            return res.data
        })
      })



      const filteredData = data ? data.filter((item) =>
      (item.reportid === report.id)
    ) : data;


    function findNameById(idToFind) {
        // Use the find method to search for the object with the matching id
        const m = medicineData.find(obj => obj.id === parseInt(idToFind));
        if (m) {
            return m.medicationName;
        } else {
            return idToFind; // Return a default value if the id is not found
        }
    }
    
 
    //   console.log(member);

  return (
    <div className="reportCard">
        {isLoading?"Loading...":
            <div className="cardContainer">
                <span className="dateTime">{report.date} {report.time}</span>
                {report.isMember === 1 &&  ( mLoading ? "loading" :  <span className="dateTime">{member.name}</span>)}
                <div className="middleContent">
                    <div className="left">
                        <h2 className="heading">Dr. {doctor.name}</h2>
                        <span className="specialisation">Specialisation : {doctor.specialisation}</span>
                    </div>
                    <div className="right">
                        <h3 className="diagnosis">Diagnosis</h3>
                        <h3 className="diagnosisActive">{report.diagnosis}</h3>

                    </div>
                </div>
                <div className="remarks">
                    <h3 className="remarksHeading">Remarks</h3>
                    <p className="remarksContent">{report.remarks}</p>
                </div>
                <div className="medicineAlloted">
                    <h3 className="medicineHeading">Medications</h3>
                    <div className="medicines">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Medication Name</th>
                                    <th>Dosage</th>
                                    <th>Days</th>
                                </tr>
                                {isLoading ? "loading" : 
                                filteredData && filteredData[0].data.map((d,i)=>(
                                    <tr key={i}>
                                    <td>{findNameById(d.medicineid)}</td>
                                    <td>{d.dosage}</td>
                                    <td>{d.days} Days</td>
                                </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="testAlloted">
                    <h3>Tests</h3>
                    <ul>
                        {tLoading ? "loading" : 
                        testData.map((d)=>(
                            <li key={d.id}>{d.test}</li>
                        ))}
                    </ul>
                </div>
            </div>
        }
    </div>
  )
}

export default ReportCard