import React, { useContext, useState } from 'react'
import './report.scss'
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import ReportCard from '../../components/reportCard/ReportCard';
import ReportSelect from '../../components/reportSelect/ReportSelect';
import { AuthContext } from '../../context/authContext';


const Report = () => {

    const [selectedMember,setSelectedMember] = useState('All')
    const {currentUser} = useContext(AuthContext)

    const { isLoading, error, data } = useQuery({
        queryKey: ['report'],
        queryFn: () => newRequest.get(`/report`).then((res) => {
            return res.data
        })
    })
    const { isLoading:mLoading, error:mError, data:medData } = useQuery({
        queryKey: ['medicine'],
        queryFn: () => newRequest.get(`/medicine`).then((res) => {
            return res.data
        })
      })

      const filteredData = data ? data.filter((item) =>
      (item.memberid ?? '') === selectedMember || (((item.patientid ?? '') === selectedMember) && (item?.isMember === 0))
    ) : data;

    // console.log(filteredData);

  return (
    <div className="report">
        <span className="nav">Home &gt; <span className='navActive' >My Report</span></span>
        <div className="reportWrapper">
            {currentUser.userType === 'Faculty' && <ReportSelect setSelectedMember={setSelectedMember}/>}
            {
                isLoading || mLoading? "Loading....":
                data.length === 0 ? "No Entries here" :
                selectedMember === 'All' ? data.map((report)=>(
                    <ReportCard  report={report} key={report.id} medicineData= {medData} />
                ))
                :
                filteredData.map((report)=>(
                    <ReportCard  report={report} key={report.id} medicineData= {medData} />
                ))
            }
        </div>
    </div>
  )
}

export default Report