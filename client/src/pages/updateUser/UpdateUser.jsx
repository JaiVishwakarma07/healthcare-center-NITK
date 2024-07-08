import React from 'react'
import './updateUser.scss'

const UpdateUser = () => {
  return (
    <div className="updateUser">
      {/* list of all users except pharmacy and admin */}
      {/* modal to update user */}
      <h1>Update User</h1>
      <div className="updateUserWrapper">
        <table>
          <tbody>
            <tr>Name</tr>
            <tr>Email</tr>
            <tr>Phone</tr>
            <tr>Address</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UpdateUser