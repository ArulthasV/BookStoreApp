import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

const CreateBook = () => {
  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [publishYear,setPublishYear] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios
      .post('http://localhost:5555/books',data)
      .then(()=>{
        setLoading(false)
        enqueueSnackbar('Book created successfully!')
        navigate('/')
      })
      .catch((err)=>{
        setLoading(false)
        enqueueSnackbar(err)
        //alert("An error happened. Please check console.")
        console.log(err)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1>Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label htmlFor="">Title</label>
              <input type="text" value={title} 
              onChange={(e)=>{setTitle(e.target.value)}} 
              className="border-2 border-gray-500 px-4 w-full"
              />
          </div>
          <div className='my-4'>
            <label htmlFor="">Author</label>
              <input type="text" value={author} 
              onChange={(e)=>{setAuthor(e.target.value)}} 
              className="border-2 border-gray-500 px-4 w-full"
              />
          </div>
          <div className='my-4'>
            <label htmlFor="">Publish Year</label>
              <input type="text" value={publishYear} 
              onChange={(e)=>{setPublishYear(e.target.value)}} 
              className="border-2 border-gray-500 px-4 w-full"
              />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
        </div>
      )}
    </div>
  )
}

export default CreateBook