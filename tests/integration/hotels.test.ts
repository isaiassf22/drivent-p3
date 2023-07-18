import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import httpStatus from "http-status";
import { createEnrollmentWithAddress, createPayment, createTicketType, createTicketTypeWithHotel, createUser } from "../factories";
import { createTicket } from "../factories";
import { TicketStatus } from "@prisma/client";
import { createHotel } from "../factories/hotel-factory";


const server = supertest(app)

beforeAll(async()=>{
     await init()
     await cleanDb()
})

beforeEach(async () => {
    await cleanDb();
  });
  

describe("get /hotels",()=>{

    it("invalid token",async () =>{
        const test1 = await server.get("/hotels")
        expect(test1).toBe(httpStatus.UNAUTHORIZED)

    })

    it("has no token",async () =>{
        const test2 = await server.get("/hotels").set("Authorization","Bearer 1234595")

    })

  
    it("ticket type is remote",async () =>{
        const newUser = await createUser()
        const newToken = await generateValidToken(newUser)
        const enrollment = await createEnrollmentWithAddress(newUser)
        const ticketType = await createTicketType()
        const ticket=  await createTicket(enrollment.id,ticketType.id,TicketStatus.PAID)

        const test3 =  await server.get("/hotels").set("Authorization",`Bearer ${newToken}`)
        expect(test3).toBe(httpStatus.PAYMENT_REQUIRED)

    })
    // cenário em que da certo
    it("user has ",async () => {
        const newUser = await createUser()
        const newToken = await generateValidToken(newUser)
        const enrollment = await createEnrollmentWithAddress(newUser)
        const ticketType = await createTicketType()
        const ticket=  await createTicket(enrollment.id,ticketType.id,TicketStatus.PAID)
        const hotel = await createHotel()
        const {status,body} =  await server.get("/hotels").set("Authorization",`Bearer ${newToken}`)
        expect(status).toBe(httpStatus.OK)
        expect(body).toEqual([{
            id:hotel.id,
            name:hotel.name,
            image:hotel.image,
            createdAt: hotel.createdAt.toDateString(),
            updatedAt: hotel.updatedAt.toDateString()
        }])

    })
})



describe('get /hotels/:hotelId',()=>{

    it('has no token', async () => {
        const response = await server.get('/hotels/1');
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      })

      it('token is not valid', async () => {
        const token = "notValidtoken123";
    
        const test4 = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
    
        expect(test4.status).toBe(httpStatus.UNAUTHORIZED);
      });
    

      it('invalid hotel id', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeWithHotel();
        const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
        await createPayment(ticket.id, ticketType.price);
  
        await createHotel();
  
        const response = await server.get('/hotels/100').set('Authorization', `Bearer ${token}`);
  
        expect(response.status).toEqual(httpStatus.NOT_FOUND);
      });
})