import React from 'react'
import { Link } from 'react-router-dom'
import './footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="top">
            <div className="left">
                <div className="logo">
                    {/* <img src="/images/NITK_logo.png" alt="" /> */}
                    <h2>Health Care Center NITK Surathkal</h2>
                </div>
                <h3 className="address">
                    NH 66, Srinivasnagar <br/>
                    Surathkal, Mangalore <br/>
                    Karnataka 575025 <br/>
                </h3>
                <div className="contact">
                    <h3>0824 2474000</h3>
                    <h3>registrar@nitk.ac.in</h3>
                </div>
                <hr />
            </div>
            <div className="right">
                    <h3>Quick Links</h3>
                    <hr />
                    <a href='https://www.nitk.ac.in/' className='link' >NITK Surathkal</a>
                    <a href='https://iris.nitk.ac.in/hrms' className='link' >IRIS Portal</a>
                    <a href='https://telephone.nitk.ac.in/' className='link' >Telephone Directory</a>
                    <a href='' className='link' >About</a>
            </div> 
        </div>
        <div className="bottom">
            <h3>© Copyright All Rights Reserved 2024, NITK Surathkal</h3>
        </div>
    </div>
  )
}

export default Footer