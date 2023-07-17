import { notFoundError } from "@/errors"
import hotelsRepository from "@/repositories/hotels-repository"


async function getAllhotels() {
    await hotelsRepository.getAllhotels()
}


async function hotelById(id:number) {
   const hotel= await hotelsRepository.hotelById(id)
   /* if(!hotel){
        throw notFoundError();
    }*/
}




export default {getAllhotels,hotelById}