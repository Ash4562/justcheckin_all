import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Practice() {
    const [data, setData] = useState()
    useEffect(()=>{
      axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response)=>{
        console.log(response);
        
        setData(response.data)
      })
    },[])
  return (
    
    <div>
        {data.map((newData)=>{
            return(
                <div>{data.name}</div>
            )
        })}
    </div>
  )
}

export default Practice