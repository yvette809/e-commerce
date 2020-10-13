const express = require("express")
const server = express()
const cors = require("cors")
const dotenv = require("dotenv")



dotenv.config()
server.use(cors())
server.use(express.json())


const port = process.env.PORT || 4070

server.listen(port, ()=>{
    console.log(`server is runnin on port ${port}`)
})