import React, { useContext, useState } from 'react'
import "./loginModal.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'


const LoginModal = () => {

    const [inputs, setInputs] = useState({
        id: "",
        password: "",
    })
    const [err, setErr] = useState(null)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const { login } = useContext(AuthContext);
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs);
            navigate("/")
        } catch (err) {
            setErr(err.response.data)
        }
    };


  return (
    <div className='loginModal' >
        <div className="loginModalContainer">
            <h1>Welcome to HCC <br /> <span>Please Sign In to your Account</span></h1>
            <div className="form">
                <input type="text" placeholder='User Id' name='id' onChange={handleChange} />
                <input type="password" placeholder='Password' name='password' onChange={handleChange} />
            </div>
            <button onClick={handleLogin}><LogoutIcon/> Login to HCC</button>
                        {err && err}
            </div>
    </div>
  )
}

export default LoginModal