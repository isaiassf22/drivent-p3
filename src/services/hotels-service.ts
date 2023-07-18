import { notFoundError } from "@/errors"
import hotelsRepository from "@/repositories/hotels-repository"
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { cannotListHotelsError } from "@/errors/hotel-errors";


async function listHotels(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
      throw notFoundError();
    }
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  
    if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
      throw cannotListHotelsError(); 
    }
  }


async function getAllhotels(userId: number) {
    await listHotels(userId);

   const hotels= await hotelsRepository.getAllhotels()
    
    return hotels
}


async function hotelById(userId: number, hotelId: number) {
 
    await listHotels(userId);

 
    const hotel= await hotelsRepository.hotelById(hotelId)
 
    if (!hotel) {
        throw notFoundError();
      }
      return hotel;
}




export default {getAllhotels,hotelById}