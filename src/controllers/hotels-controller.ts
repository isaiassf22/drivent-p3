import hotelsService from "@/services/hotels-service";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";




async function getAllhotels(req: AuthenticatedRequest, res:Response) {
    const {userId}= req
    try {
      const hotels= await hotelsService.getAllhotels(userId)
      return res.status(httpStatus.OK).send(hotels)
    } catch(err){
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
          return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    
}


async function hotelById(req: AuthenticatedRequest, res:Response) {
    const {userId}= req
    const hotelId = Number(req.params.id)

    try{
       const hotels= await hotelsService.hotelById(userId,hotelId)
       return res.status(httpStatus.OK).send(hotels)
    }catch(err){
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
          if (err.name === 'CannotListHotelsError') {
            return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
          }
          return res.sendStatus(httpStatus.BAD_REQUEST);
    }
   
}

export default {getAllhotels,hotelById}