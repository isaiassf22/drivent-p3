import hotelsController from "@/controllers/hotels-controller"
import { authenticateToken } from "@/middlewares"
import { Router } from "express"

const hotelRouter = Router()

hotelRouter.get('/',authenticateToken,hotelsController.getAllhotels)
hotelRouter.get('/:id',authenticateToken,hotelsController.hotelById)



export {hotelRouter}
