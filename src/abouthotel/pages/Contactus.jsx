import React from 'react'
import { useParams } from 'react-router-dom'

function Contactus() {
  let {name}=useParams()
  console.log(name)
  
  return <>
    <div className='bg-red-900 h-screen content-center text-center text-white text-3xl'>this is contact us section</div>
    <h1>{name}</h1>
    </>
}

export default Contactus