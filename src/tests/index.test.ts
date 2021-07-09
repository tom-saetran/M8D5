import supertest from "supertest"
import server from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { response } from "express"
import { Accommodation } from "../interfaces"

dotenv.config()
const request = supertest(server)

const { ATLAS_TEST_URL } = process.env

describe("All Routes", () => {
    const validEntry: Accommodation = {
        name: "Test Entry",
        description: "Test Description",
        location: { city: "Test City" },
        maxGuest: 420
    }

    const invalidEntry = {
        description: true,
        location: { city: 5 },
        maxGuest: "420"
    }

    const modifiedEntry = { name: "Modifed Name" }
    let validID = ""

    beforeAll(done => {
        mongoose.connect(ATLAS_TEST_URL! + "/discard", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => done())
    })

    // ROUTE ACCOMODATION
    // GET ALL
    // Expect list of all accomodation
    // 200 OK
    it("should test that GET /accomodation returns 200", async () => {
        const response = await request.get("/accomodation")
        expect(response.status).toBe(200)
        expect(response.body.result.length).toBe(0)
    })

    // POST
    // expect post a new accomodation
    // 400 if invalid data
    // 201 Created
    it("should test that POST /accomodation returns 201 on valid data", async () => {
        const response = await request.post("/users").send(validEntry)

        expect(response.status).toBe(201)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that POST /accomodation returns 400 on invalid data", async () => {
        const responseA = await request.post("/users").send(invalidEntry)
        const responseB = await request.post("/users").send({})

        expect(responseA.status).toBe(400)
        expect(responseB.status).toBe(400)
    })

    // PUT:ID
    // expect edit of accomodation
    // 200 ok
    // 400 invalid format
    // 404 not found

    // POST => GET ID => PUT WITH ID => TEST PASS

    it("should test that PUT /accomodation returns 200 on valid entry", async () => {
        const response = await request.put(`accommodation/${validID}`).send(modifiedEntry)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Modified Name")
    })

    it("should test that PUT /accomodation returns 400 on invalid entry", async () => {
        const response = await request.post(`accommodation/${validID}`).send(invalidEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /accomodation returns 400 on invalid id", async () => {
        const response = await request.post(`accommodation/VOIDVOIDVOID`).send(modifiedEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /accomodation returns 404 on not found", async () => {
        const response = await request.post("/accommodation/60bc1808ae33b80015046cc5").send(modifiedEntry)
        expect(response.status).toBe(404)
    })

    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that GET /accomodation returns 200 on valid entry", async () => {
        const response = await request.get("/accommodation/" + validID)
        expect(response.status).toBe(200)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that GET /accomodation returns 400 on invalid id", async () => {
        const response = await request.get("/accommodation/VOIDVOIDVOID")
        expect(response.status).toBe(400)
    })

    it("should test that GET /accomodation returns 404 on id not found", async () => {
        const response = await request.get("/accommodation/60bc1808ae33b80015046cc5")
        expect(response.status).toBe(404)
    })

    // DEL:ID
    // 204 Gone
    // 400 invalid format
    // 404 not found

    it("should test that DELETE /accomodation returns 204 on valid entry", async () => {
        const response = await request.delete("/accommodation/" + validID)
        expect(response.status).toBe(204)
    })

    it("should test that DELETE /accomodation returns 400 on invalid id", async () => {
        const response = await request.delete("/accommodation/VOIDVOIDVOID")
        expect(response.status).toBe(400)
    })

    it("should test that DELETE /accomodation returns 404 on id not found", async () => {
        const response = await request.delete("/accommodation/60bc1808ae33b80015046cc5")
        expect(response.status).toBe(404)
    })

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

    /*
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
