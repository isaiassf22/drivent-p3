import hotelsRepository from "@/repositories/hotels-repository"


async function getAllhotels() {
    await hotelsRepository.getAllhotels()
}


async function hotelById(id:number) {
    await hotelsRepository.hotelById(id)
}




export default {getAllhotels,hotelById}