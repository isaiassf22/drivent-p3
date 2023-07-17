import hotelsService from "@/services/hotels-service";
import { Request, Response } from "express";

async function getAllhotels(req: Request, res:Response) {
    await hotelsService.getAllhotels()
}


async function hotelById(req: Request, res:Response) {
    const id = Number(req.params.id)
    await hotelsService.hotelById(id)
}