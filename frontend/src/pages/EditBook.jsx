import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar} from 'notistack'

const EditBook = () => {
  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [publishYear,setPublishYear] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const {enqueueSnackbar} = useSnackbar()

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res)=>{
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear)
        setLoading(false)
      })
      .catch((err)=>{
        console.log(err)
        alert("An error happended. Please check console.")
      })


  },[])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios
      .put(`http://localhost:5555/books/${id}`,data)
      .then(()=>{
        setLoading(false)
        enqueueSnackbar('Book is edited successfully!')
        navigate('/')
      })
      .catch((err)=>{
        setLoading(false)
        enqueueSnackbar('error')
        //alert("An error happened. Please check console.")
        console.log(err)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1>Edit Book</h1>
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
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Edit Book</button>
        </div>
      )}
    </div>
  )
}

export default EditBook