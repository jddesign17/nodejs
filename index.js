const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const PORT = 3000
const path = require('path')
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static("./uploads"))


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })




// database
mongoose.connect("mongodb://localhost:27017/userDummyData").then(()=>console.log("DataBase Conknected")).catch((err)=>console.log(err))

const userData = mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    image:String
})

const User = mongoose.model('user',userData)
// database

app.post('/postdata',upload.single('image'),async(req,res)=>{
    try {
      
      const {name,age,email} = req.body
      let image = ""

      if(req.file)
      {
          image = req.file.filename
      }
      const SavingData = new User({
        name:name,
        age:age,
        email:email,
        image:image
      })

      const savedData = await SavingData.save()

      res.send(savedData)
     
    } catch (error) {
      console.log(error)
    }
})


app.get('/getdata',async(req,res)=>{
  try {
      const data = await User.find()
      res.send(data)
  } catch (error) {
      res.send(error)
  }
})

app.listen(PORT,()=>console.log("server is Running!!"))







