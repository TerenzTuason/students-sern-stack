import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewStudent = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const navigateBack = useNavigate()

    const handleSubmit = (e) => {

        // posts the data to the API
        e.preventDefault()
        axios.post("http://localhost:4000/new_student", { name, email })    // name and email are the req values
        .then(res => {
            console.log(res)
            navigateBack("/")
        }).catch(err => console.log(err))

    }

  return (
    <div className='w-screen h-screen bg-[#000000] flex justify-center items-center'>

        <form onSubmit={handleSubmit} className='w-[40%] bg-[#48018d] rounded-[10px] p-[20px] flex flex-col text-white'>

            <p className='text-[28px] text-center'>Add Student</p>

            <label className='mt-[20px]'>Name</label>
            <input type="text" placeholder='Enter Name' className='mt-[10px] p-[10px] rounded-[10px] text-black' 
            onChange={(e) => {
                setName(e.target.value)
            }} />

            <label className='mt-[20px]'>Email</label>
            <input type="text" placeholder='Enter Email' className='mt-[10px] p-[10px] rounded-[10px] text-black'
            onChange={(e) => {
                setEmail(e.target.value)
            }} />

            <button className='w-fit px-[30px] py-[10px] rounded-[10px] bg-[#219f3a] text-white mt-[30px]'>Submit</button>

        </form>

    </div>
  )
}

export default NewStudent