import express from "express"
import cookieParser from "cookie-parser"

const app = express()   

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({}))
app.use(cookieParser())

app.get('/' , (req,res)=>{
    res.json({message:"Server is runnning on "})
})

export default app