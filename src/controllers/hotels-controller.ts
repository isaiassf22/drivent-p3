import hotelsService from "@/services/hotels-service";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";




async function getAllhotels(req: AuthenticatedRequest, res:Response) {
    
    try {
      const hotels= await hotelsService.getAllhotels()
      return res.status(httpStatus.OK).send(hotels)
    } catch(err){
        console.log(err.message)
        res.sendStatus(httpStatus.BAD_REQUEST)
    }
    
}


async function hotelById(req: AuthenticatedRequest, res:Response) {
    const hotelId = Number(req.params.id)
    try{
       const hotels= await hotelsService.hotelById(hotelId)
       return res.status(httpStatus.OK).send(hotels)
    }catch(err){
        console.log(err.details.message)
        res.sendStatus(httpStatus.BAD_REQUEST)
    }
   
}