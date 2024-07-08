import React, { useState } from 'react'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'
import './addDoctor.scss'

const AddDoctor = () => {
    const [user,setUser] = useState({
        id : '',
        name : '',
        email : '',
        password : '',
        phone : '',
        address : '',
        city : '',
        userType : 'doctor',
        pincode : 0,
        state : '',
        country : '',
        idproof : '',
        age : 0,
        gender : '',
        specialisation : ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await newRequest.post('/auth/register',user)
            navigate('/')
        } catch (error) {
            console.log(error);
        }  
    }
  return (
    <div className="addDoctor">
        <div className="addDoctorWrapper">
            <form onSubmit={handleSubmit}>
                <div className="formContainer">
                    <div className="left">
                        <input type="text" name='id' placeholder='User ID' onChange={handleChange}  />
                        <input type="text" name='name' placeholder='Name' onChange={handleChange}  />
                        <input type="text" name='email' placeholder='Email' onChange={handleChange}  />
                        <input type="text" name='password' placeholder='Password' onChange={handleChange}/>
                        <input type="text" name='phone' placeholder='Phone' onChange={handleChange}  />
                        <input type="text" name='address' placeholder='Address' onChange={handleChange}  />
                        <input type="text" name='city' placeholder='City' onChange={handleChange}  />
                    </div>
                    <div className="right">
                        <input type="number" name='pincode' placeholder='Pincode' onChange={handleChange}  />
                        <input type="text" name='state' placeholder='State' onChange={handleChange}  />
                        <input type="text" name='country' placeholder='Country' onChange={handleChange}  />
                        <input type="text" name='idproof' placeholder='ID Proof' onChange={handleChange}  />
                        <input type="number" name='age' placeholder='Age' onChange={handleChange}  />
                        <input type="text" name='gender' placeholder='Gender' onChange={handleChange}  />
                        <input type="text" name='specialisation' placeholder='Specialisation' onChange={handleChange}  />
                    </div>
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
    </div>
  )
}

export default AddDoctor