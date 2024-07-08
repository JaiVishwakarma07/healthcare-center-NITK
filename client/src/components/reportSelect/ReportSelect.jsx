import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import './reportSelect.scss'

const ReportSelect = ({setSelectedMember}) => {

    const {currentUser} = useContext(AuthContext)

    const { isLoading, error, data } = useQuery({
        queryKey: ['allFacultyMembers'],
        queryFn: () => newRequest.get(`/faculty/all/${currentUser.id}`).then((res) => {
            return res.data
        })
    })

    // console.log(data);

  return (
    <select className='reportSelect' name="" id="" onChange={(e)=>setSelectedMember(e.target.value)} >
        <option value="All">All</option>
        <option value={currentUser.id}>{currentUser.name}</option>
        {isLoading ? "loading" : 
        data.map((d)=>(
            <option key={d.id} value={d.id}>{d.name}</option>
        ))
        }
    </select>
  )
}

export default ReportSelect