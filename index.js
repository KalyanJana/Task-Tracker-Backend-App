import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import taskRouter from './routes/taskRouter.js'
import userRouter from './routes/userRouter.js'
import itemsRouter from './routes/itemsRouter.js'
import connectToMongoDB from './mongo/connection.js'
import cookieParser from 'cookie-parser'

export const app = express()


config({
    path: './mongo/config.env'
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET, POST, PUT, DELETE'],
    credentials: true,

}))


app.use("/tasks",taskRouter)
app.use("/items",itemsRouter)
app.use("/users", userRouter)

app.get("/", (req, res)=>{
    res.send("Nice working")
})


//connect to MongoDB
const port = process.env.PORT
connectToMongoDB()
    .then(()=>{
        app.listen(port,()=>{
            console.log(`Server stated on port ${port}`)
        })
    })
    .catch((error)=>{
        console.log("Error connecting to MongoDB :", error)
        process.exit(1)
    })

//Handle unhandled promise rejections
process.on('unhandledRejection', (err)=>{
    console.error("Unhandled Promise Rejection : ", err)
})
