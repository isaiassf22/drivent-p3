import { authenticateToken } from "@/middlewares"
import { Router } from "express"

const hotelRouter = Router()

hotelRouter.get('/',authenticateToken,)
hotelRouter.get('/:id',authenticateToken,)



export {hotelRouter}
