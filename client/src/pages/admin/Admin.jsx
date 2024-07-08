import React from 'react'
import './admin.scss'
import  {Link} from 'react-router-dom'

const Admin = () => {

  return (
    <div className="adminComponent">
        <h1>Admin Portal</h1>
        <div className="adminWrapper">
            <Link className='adminItem' to='/admin/adduser' >
                <h3>Add Patient</h3>
            </Link>
            {/* <Link className='adminItem' to='/admin/updateuser'  >
                <h3>Update user</h3>
            </Link> */}
            <Link className='adminItem' to='/admin/addmember'  >
                <h3>Add Family Member <br /> of Faculty</h3>
            </Link>
            <Link className='adminItem' to='/admin/adddoctor' >
                <h3>Add Doctor</h3>
            </Link>
            <Link className='adminItem' to='/admin/updatedoctor'  >
                <h3>Update Doctor</h3>
            </Link>
            <Link className='adminItem' to='/admin/updateNoticeBoard'  >
                <h3>Update Notice Board</h3>
            </Link>
        </div>
    </div>
  )
}

export default Admin