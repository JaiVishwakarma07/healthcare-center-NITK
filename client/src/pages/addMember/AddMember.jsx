import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import newRequest from '../../utils/newRequest';
import {useNavigate} from 'react-router-dom'
import './addMember.scss'

const AddMember = () => {

  const navigate = useNavigate()
  
  const [member,setMember] = useState({
    facultyid : "",
    name : "",
    id : "",
    phone : "",
    email : "",
    age : 0,
    gender : ""
  })

  const queryClient = useQueryClient();

  const mutation = useMutation({
      mutationFn: (member) => {
          return newRequest.post(`/faculty`,member)
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["facultyMembers"])
      },
      onError : (error)=>{
        console.log(error);
      }
    })

  const handleChange = (e)=>{
    setMember((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
  })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    mutation.mutate(member)
    navigate('/')
  }

  return (
    <div className="addMember">
      <h1>Add Member</h1>
      <div className="addMemberContainer">
        <form className='addMemberForm' onSubmit={handleSubmit}>
          <div className="addMemberWrapper">
            <div className="left">
              <input type="text" placeholder='Faculty ID' name='facultyid' onChange={handleChange} />
              <input type="text" placeholder='Name' name='name' onChange={handleChange} />
              <input type="text" placeholder='Email' name='email' onChange={handleChange} />
              <input type="text" placeholder='Phone' name='phone' onChange={handleChange} />
            </div>
            <div className="right">
              <input type="text" placeholder='Adhaar No.' name='id' onChange={handleChange} />
              <input type="number" placeholder='Age' name='age' onChange={handleChange} />
              <input type="text" placeholder='Gender' name='gender' onChange={handleChange} />
            </div>
          </div>
          <button type='submit'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddMember