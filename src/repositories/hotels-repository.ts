import { prisma } from "@/config"



async function getAllhotels() {
   return await prisma.hotel.findMany()
}

async function hotelById(id:number) {
   
    return prisma.hotel.findFirst({
        where: {
          id
        },
        include: {
          Rooms: true,
        },
      });

}


export default{getAllhotels,hotelById}