import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"

export default function ServicePage() {
  const {postSlug}=useParams();
  const [post, setPost]=useState({});
  const [errorMessage, setErrorMessage]=useState("");

  console.log(post)
  useEffect(()=>{
    const getPost=async()=>{
      try {
        const res=await fetch(`http://localhost:5000/api/service/${postSlug}`)
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    getPost();
  }, [postSlug])
  return (
    <div className='min-h-screen max-w-[1000px] mx-auto'>
      lskadf; sadfsdf
    </div>
  )
}
