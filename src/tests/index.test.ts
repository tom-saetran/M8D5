import supertest from "supertest"
import server from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { response } from "express"

dotenv.config()
const request = supertest(server)

const { ATLAS_URL } = process.env

describe("Testing suite #1", () => {
    beforeAll(done => {
        mongoose.connect(ATLAS_URL!, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => done())
    })

    it("should test that true is true", () => {
        expect(true).toBe(true)
    })

    // ROUTE ACCOMODATION
    // GET ALL
    // Expect list of all accomodation
    // 200 OK

    // POST
    // expect post a new accomodation
    // 400 if invalid data
    // 201 Created

    // PUT:ID
    // expect edit of accomodation
    // 200 ok
    // 400 invalid format
    // 404 not found

    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found

    // DEL:ID
    // 204 Gone
    // 400 invalid format
    // 404 not found

    // ROUTE DESTINATIONS
    // GET ALL
    // Expect list of all accomodation
    // 200 OK

    // POST
    // expect post a new accomodation
    // 400 if invalid data
    // 201 Created

    // PUT:ID
    // expect edit of accomodation
    // 200 ok
    // 400 invalid format
    // 404 not found

    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found

    // DEL:ID
    // 204 Gone
    // 400 invalid format
    // 404 not found

    /*it("should test that the /users/online is returning 200", async () => {
        const response = await request.get("/users/online")
        expect(response.status).toBe(200)
        expect(response.body.onlineUsers.length).toBe(0)
    })
    // POST /users

    const validUser = {
        username: "John"
    }

    it("should test that we can POST a new user", async () => {
        const response = await request.post("/users").send(validUser)

        expect(response.status).toBe(201)
        expect(typeof response.body._id).toBe("string")
    })

    // GET /users/:id

    it("should test that we can GET a user with the given id", async () => {
        const newUserResponse = await request.post("/users").send(validUser)

        const { _id } = newUserResponse.body

        const response = await request.get(`/users/${_id}`)

        expect(response.status).toBe(200)
        expect(response.body.username).toBe(validUser.username)
    })

    // DELETE /users/:id

    it("should test that we can DELETE a user with a given id", async () => {
        const newUserResponse = await request.post("/users").send(validUser)

        const { _id } = newUserResponse.body

        const response = await request.del(`/users/${_id}`)

        expect(response.status).toBe(204)

        const getResponse = await request.get(`/users/${_id}`)

        expect(getResponse.status).toBe(404)
    })*/

    afterAll(done => {
        mongoose.connection.dropDatabase().then(() => {
            mongoose.connection.close().then(done)
        })
    })
})
