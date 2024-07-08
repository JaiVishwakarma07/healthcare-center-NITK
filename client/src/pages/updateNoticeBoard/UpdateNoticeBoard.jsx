import React, { useState } from 'react'
import './updateNoticeBoard.scss'
import AddNoticeModal from '../../components/addNoticeModal/AddNoticeModal'
import UpdateNoticeModal from '../../components/updateNoticeModal/UpdateNoticeModal'
import newRequest from '../../utils/newRequest'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const UpdateNoticeBoard = () => {
    const [openUpdate,setOpenUpdate] = useState(false)
    const [openAdd,setOpenAdd] = useState(false)
    const [id,setId] = useState(0)
    const [prevNotice,setPrevNotice] = useState("")

    const { isLoading, error, data } = useQuery({
        queryKey: ['notice'],
        queryFn: () => newRequest.get(`/notice`).then((res) => {
            return res.data
        })
      })

      const queryClient = useQueryClient();

      const mutation = useMutation({
          mutationFn: (id) => {
              return newRequest.delete(`/notice/${id}`)
          },
          onSuccess: () => {
              queryClient.invalidateQueries(["notice"])
          },
          onError : (error)=>{
            console.log(error);
          }
        })


        const handleDelete = (id)=>{
            mutation.mutate(id)
        }



  return (
    <div className="updateNB">
        <h1 className='nbHeading' >UPDATE NOTICE BOARD</h1>
        <div className="updateNBWrapper">
            <button className='add' onClick={()=>setOpenAdd(true)} >Add</button>
            <table className='uNBTable'>
                <tbody>
                    <tr className='uNBTr'>
                        <th className='uNBTh head' >NOTICE</th>
                        <th className='uNBTh head' >DATE</th>
                        <th className='uNBTh head' >DELETE</th>
                        <th className='uNBTh head' >UPDATE</th>
                    </tr>
                    {isLoading ? "loading" :  
                        data.map((d)=>(
                            <tr key={d.id} >
                                <th className='uNBTh' >{d.notice}</th>
                                <th className='uNBTh' >{d.date}</th>
                                <th className='uNBTh' ><button className='delete' onClick={()=>handleDelete(d.id)} >Delete</button></th>   
                                <th className='uNBTh' ><button className='update' onClick={()=>{
                                    setOpenUpdate(true),
                                    setId(d.id),
                                    setPrevNotice(d.notice)
                                    }} >Update</button></th>
                            </tr>
                        ))
                    } 
                </tbody>
            </table>
        </div>
        {openAdd && <AddNoticeModal setOpen={setOpenAdd} open={openAdd} />}
        {openUpdate && <UpdateNoticeModal setOpen={setOpenUpdate} open={openUpdate} prevNotice={prevNotice} id={id} />}
    </div>
  )
}

export default UpdateNoticeBoard