import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";

const server = supertest(app)

beforeAll(async()=>{
     await init()
     await cleanDb()
})


describe("get hotels",()=>{

    it("invalid token",async () =>{


    })

    it("no token",async () =>{


    })

    it("token is not allowed",async () =>{


    })

})