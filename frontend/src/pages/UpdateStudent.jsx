import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateStudent = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const navigateBack = useNavigate()

    // accesses the ":id" parameter name (needs the curly bracket)
    const {id} = useParams()

    // gets all the data for this specific student
    useEffect(() => {

        // gets the data from the API
        axios.get("https://students-sern-stack-production.up.railway.app/" + id)
        .then(res => {
            setName(res.data[0].Name)
            setEmail(res.data[0].Email)
        })
        .catch(err => console.log(err))

    }, [])

    // handles the update after submit
    const handleSubmit = (e) => {

        // updates the data in the API
        e.preventDefault()
        axios.put("https://students-sern-stack-production.up.railway.app/update_student/" + id, { name, email })    // name and email are the req values
        .then(res => {
            console.log(res)
            navigateBack("/")
        }).catch(err => console.log(err))

    }

  return (
    <div className='w-screen h-screen bg-[#000000] flex justify-center items-center'>
        
        <form onSubmit={handleSubmit} className='w-[40%] bg-[#48018d] rounded-[10px] p-[20px] flex flex-col text-white'>

            <p className='text-[28px] text-center'>Update Student</p>

            <label className='mt-[20px]'>Name</label>
            <input type="text" placeholder='Enter Name' className='mt-[10px] p-[10px] rounded-[10px] text-black' 
            onChange={(e) => {
                setName(e.target.value)
            }}
            value={name} />

            <label className='mt-[20px]'>Email</label>
            <input type="text" placeholder='Enter Email' className='mt-[10px] p-[10px] rounded-[10px] text-black'
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            value={email} />

            <button className='w-fit px-[30px] py-[10px] rounded-[10px] bg-[#219f3a] text-white mt-[30px]'>Update</button>

        </form>

    </div>
  )
}

export default UpdateStudent