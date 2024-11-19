import React, { useEffect, useState } from 'react'
import axios from "axios"
const App = () => {

 

  const [name,setData1] = useState([])
  const [age,setData2] = useState([])

  const handleFormSubmission = async()=>{
      try
      {
          const resposne = await axios.post("http://localhost:8000/postData",{
            name:name,
            age:age
          },{
            headers:{
              "Content-Type":"application/json"
            }
          })
          console.log(resposne.data)
      }catch(err)
      {
          console.log(err)
      } 
  } 

  return (
    <div>
      <div>
          <input type='text' placeholder='Enter Name' onChange={(e)=>setData1(e.target.value)}/>
          <input type='number' placeholder='Enter Age' onChange={(e)=>setData2(e.target.value)}/>
          <button onClick={handleFormSubmission} >Submit</button>
      </div>
    </div>
  )
}

export default App