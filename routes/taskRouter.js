import express from 'express'
import{ addNewTask, updateTask, deleteTask} from '../controllers/task.js'
import { isAuthenticated } from '../middlewares/auth.js'

const taskRouter = express.Router()

taskRouter.post("/new", isAuthenticated,  addNewTask)

taskRouter
    .route("/:id")
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask)

export default taskRouter