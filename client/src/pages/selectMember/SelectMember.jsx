import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import newRequest from '../../utils/newRequest'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import './selectMember.scss'

const SelectMember = () => {

    const {currentUser} = useContext(AuthContext)

    const { isLoading, error, data } = useQuery({
        queryKey: ['faculty'],
        queryFn: () => newRequest.get(`/user/find/facultymembers/${currentUser.id}`).then((res) => {
            return res.data
        })
      })
      console.log(data);
  return (
    <div className="selectMember">
    <span className="nav">Home &gt; <span className='navActive' >SelectMember</span></span>
    <div className="menu">
      <div className="menuHeading">Select Member</div>
    </div>
    <div className="memberWrapper">
        <Link to={`/bookappointments`}  className="member">
            <span className="memberName">{currentUser.name}</span>
        </Link>
      {
        isLoading ? "Loading...":
        data.map((item,i)=>(
          <Link to={`/bookappointments?memberId=${item.id}`} key={i} className="member">
            <span className="memberName">{item.name}</span>
          </Link>
        ))
      }
    </div>
  </div>
  )
}

export default SelectMember