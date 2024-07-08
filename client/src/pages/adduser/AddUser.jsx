import React, { useState } from 'react'
import './addUser.scss'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {
    const [user,setUser] = useState({
        id : '',
        name : '',
        email : '',
        password : '',
        phone : '',
        address : '',
        city : '',
        userType : '',
        pincode : 0,
        state : '',
        country : '',
        idproof : '',
        age : 0,
        gender : ''
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
    <div className='addUser'>
        <h1>Add Patient</h1>
        <div className="addUserWrapper">
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
                        <input type="text" name='idproof' placeholder='Addhar Number' onChange={handleChange}  />
                        <input type="number" name='age' placeholder='Age' onChange={handleChange}  />
                        <select name="gender" onChange={handleChange} placeholder='Gender' >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {/* <input type="text" name='gender' placeholder='Gender' onChange={handleChange}  /> */}
                        <select name="userType" onChange={handleChange} placeholder='UserType' >
                            <option value="">Select User Type</option>
                            <option value="Faculty">Faculty</option>
                            <option value="patient">Student</option>
                        </select>
                        {/* <input type="text" name='userType' placeholder='User Type' onChange={handleChange}  /> */}
                    </div>
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
    </div>
  )
}

export default AddUser