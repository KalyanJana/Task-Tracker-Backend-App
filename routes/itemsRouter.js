import express from 'express'
import{ getMyItems, addItems} from '../controllers/items.js'
import { isAuthenticated } from '../middlewares/auth.js'

const itemsRouter = express.Router()

itemsRouter.get("/my", isAuthenticated, getMyItems)
itemsRouter.post("/item", isAuthenticated, addItems)


export default itemsRouter