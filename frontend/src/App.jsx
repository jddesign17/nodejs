import React, { useEffect, useState } from 'react'
import axios from "axios"
const App = () => {


  useEffect(()=>{
    getApi()
  },[])

  const [data,setData] = useState([])

  async  function getApi()
  {
    try {
      
     const response = await axios.get("http://localhost:3000/getData")
    setData(response.data)
    } catch (error) {
        console.log(error)
    }
  }
 

  const [name,setData1] = useState("")
  const [age,setData2] = useState("")
  const [email,setData3] = useState("")
  const [image,setImage] = useState(null)

  const handleFormSubmission = async()=>{

    const formData = new FormData()
    formData.append("name",name)
    formData.append("age",age)
    formData.append("image",image)
    formData.append("email",email)
  
    

      try
      {
          const resposne = await axios.post("http://localhost:3000/postdata",formData,{
            headers:{
              "Content-Type":"multipart/form-data"
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
          <input type='text' placeholder='Enter Email' onChange={(e)=>setData3(e.target.value)}/>
          <input type='file' onChange={(e)=>setImage(e.target.files[0])} name='image'/>
          <button onClick={handleFormSubmission} >Submit</button>
      </div>

      {
        data && data.map((item)=>(
          <div>
            <h2>{item.name}</h2>
            <h2>{item.age}</h2>
            <h2>{item.email}</h2>
            <img src={`http://localhost:3000/uploads/${item.image}`} />
            </div>

        ))
      }
    </div>
  )
}

export default App