import React from 'react'
import "./about.scss"

const About = () => {
  return (
    <div className="about">
        <div className="menu">
            <h3 className="menuHeading active" >About </h3>
            {/* <h3 className="menuHeading" >Scheduled </h3> */}
        </div>
        <div className="aboutWrapper">
            <div className="item">
                <h2 className="heading">Health Care Centre, NITK</h2>
                <p className="content">
                    Driven by a broader and better understanding of health and its impact on learning the institute has established the Health Care Centre to 
                    oversee and coordinate the medical care provided on the campus. Located within easy reach of the NITK community at the centre of the 
                    campus, opposite to the main playground, the centre plays a key role in catering to the increasing medical needs of the campus. Through the 
                    promotion of healthy lifestyles the Health Care Centre provides critical support to the academic mission.
                </p>
                <h2 className="heading">Helpline</h2>
                <div className="contact">
                    <div className="contactLeft">
                        <h2>Reception Counter</h2>
                        <div className="phone">
                            <span >08242473070</span>
                            <span >3070 (intercom)</span>
                        </div>
                        <span className="timings">Mon – Fri 9:00A.M. – 5:00P.M.</span>
                    </div>
                    <div className="contactRight">
                    <h2>Ambulance</h2>
                        <div className="phone">
                            <span >9880375287</span>
                            <span >8105520077</span>
                        </div>
                        <span className="timings">Mon – Fri 9:00A.M. – 5:00P.M.</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default About