import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {

        // gets the data from the API
        axios.get("https://students-sern-stack-production.up.railway.app/")
        .then(res => 
            setStudents(res.data)
        )
        .catch(err => console.log(err))

    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete("https://students-sern-stack-production.up.railway.app/delete_student/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='w-screen h-screen bg-[#000000] flex justify-center items-center'>

        <div className='w-[70%] h-[70%] bg-[#48018d] rounded-[10px] p-[20px] overflow-y-scroll'>
            <Link to="/new_student" className='w-fit px-[30px] py-[10px] rounded-[10px] bg-[#219f3a] mb-[20px] text-white flex items-center'>Add <IoMdAdd className='ml-[10px]' /></Link>

            <div className='border-b-2 grid grid-cols-4 text-white pb-[20px]'>
                <p>ID</p>
                <p>Name</p>
                <p>Email</p>
                <p className='text-center'>Action</p>
            </div>

            {students.map((student) => (
                <div className='grid grid-cols-4 text-white mt-[20px]'>
                    <p> {student.ID} </p>
                    <p> {student.Name} </p>
                    <p> {student.Email} </p>
                    <div className='w-full flex gap-[10px]'>
                        <Link to={`/update/${student.ID}`} className='w-full px-[30px] bg-[#438cce] text-center'>Update</Link>
                        <button className='w-full px-[30px] bg-[#d9554e] text-center' onClick={() => handleDelete(student.ID)}>Delete</button>
                    </div>
                </div>
            ))}

        </div>

    </div>
  )
}

export default Home