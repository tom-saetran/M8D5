import supertest from "supertest"
import server from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { Accommodation, Location } from "../interfaces"

dotenv.config()
const request = supertest(server)

const { ATLAS_TEST_URL } = process.env

describe("All Routes", () => {
    let validaccommodationID = ""
    let validLocationID = ""

    const validaccommodationEntry: Accommodation = {
        name: "Test Entry",
        description: "Test Description",
        location: validLocationID,
        maxGuest: 420
    }
    const invalidaccommodationEntry = {
        description: true,
        location: { city: 5 },
        maxGuest: "420"
    }
    const modifiedaccommodationEntry = { name: "Modifed Name" }

    const validDestinationEntry: Location = { city: "Test City" }
    const invalidDestinationEntry = { city: true }
    const modifiedDestinationEntry = { city: "Modifed City" }

    beforeAll(async () => {
        mongoose.connect(ATLAS_TEST_URL! + "/discard", { useNewUrlParser: true, useUnifiedTopology: true })
        const location = await request.post("/destinations").send(validDestinationEntry)
        validLocationID = await location.body._id
    })

    // ROUTE accommodation
    // GET ALL
    // Expect list of all accommodation
    // 200 OK

    it("should test that GET /accommodation returns 200", async () => {
        const response = await request.get("/accommodation")
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(0)
    })

    // POST
    // expect post a new accommodation
    // 400 if invalid data
    // 201 Created

    it("should test that POST /accommodation returns 201 on valid data", async () => {
        const response = await request.post("/accommodation").send(validaccommodationEntry)

        expect(response.status).toBe(201)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that POST /accommodation returns 400 on invalid data", async () => {
        const responseA = await request.post("/accommodation").send(invalidaccommodationEntry)
        const responseB = await request.post("/accommodation").send({})

        expect(responseA.status).toBe(400)
        expect(responseB.status).toBe(400)
    })

    // PUT:ID
    // expect edit of accommodation
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that PUT /accommodation returns 200 on valid entry", async () => {
        const response = await request.put(`/accommodation/${validaccommodationID}`).send(modifiedaccommodationEntry)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Modified Name")
    })

    it("should test that PUT /accommodation returns 400 on invalid entry", async () => {
        const response = await request.put(`/accommodation/${validaccommodationID}`).send(invalidaccommodationEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /accommodation returns 400 on invalid id", async () => {
        const response = await request.put(`/accommodation/noID`).send(modifiedaccommodationEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /accommodation returns 404 on not found", async () => {
        const response = await request.put("/accommodation/60bc1808ae33b80015046cc5").send(modifiedaccommodationEntry)
        expect(response.status).toBe(404)
    })

    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that GET /accommodation returns 200 on valid entry", async () => {
        const response = await request.get(`/accommodation/${validaccommodationID}`)
        expect(response.status).toBe(200)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that GET /accommodation returns 400 on invalid id", async () => {
        const response = await request.get("/accommodation/noID")
        expect(response.status).toBe(400)
    })

    it("should test that GET /accommodation returns 404 on id not found", async () => {
        const response = await request.get("/accommodation/60bc1808ae33b80015046cc5")
        expect(response.status).toBe(404)
    })

    // DEL:ID
    // 204 Gone
    // 400 invalid format
    // 404 not found

    it("should test that DELETE /accommodation returns 204 on valid entry", async () => {
        const response = await request.delete(`/accommodation/${validaccommodationID}`)
        expect(response.status).toBe(204)
    })

    it("should test that DELETE /accommodation returns 400 on invalid id", async () => {
        const response = await request.delete("/accommodation/noID")
        expect(response.status).toBe(400)
    })

    it("should test that DELETE /accommodation returns 404 on id not found", async () => {
        const response = await request.delete("/accommodation/60bc1808ae33b80015046cc5")
        expect(response.status).toBe(404)
    })

    // ROUTE DESTINATIONS
    // GET ALL
    // Expect list of all accommodation
    // 200 OK

    it("should test that GET /destinations returns 200", async () => {
        const response = await request.get("/destinations")
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
    })

    // POST
    // expect post a new accommodation
    // 400 if invalid data
    // 201 Created

    it("should test that POST /destinations returns 201 on valid data", async () => {
        const response = await request.post("/destinations").send(validDestinationEntry)

        expect(response.status).toBe(201)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that POST /destinations returns 400 on invalid data", async () => {
        const responseA = await request.post("/destinations").send(invalidDestinationEntry)
        const responseB = await request.post("/destinations").send({})

        expect(responseA.status).toBe(400)
        expect(responseB.status).toBe(400)
    })

    // PUT:ID
    // expect edit of accommodation
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that PUT /destinations returns 200 on valid entry", async () => {
        const response = await request.put(`/destinations/${validLocationID}`).send(modifiedDestinationEntry)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Modified Name")
    })

    it("should test that PUT /destinations returns 400 on invalid entry", async () => {
        const response = await request.put(`/destinations/${validLocationID}`).send(invalidaccommodationEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /destinations returns 400 on invalid id", async () => {
        const response = await request.put(`/destinations/noID`).send(modifiedDestinationEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /destinations returns 404 on not found", async () => {
        const response = await request.put("/destinations/60bc1808ae33b80015046cc5").send(modifiedDestinationEntry)
        expect(response.status).toBe(404)
    })

    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that GET /destinations returns 200 on valid entry", async () => {
        const response = await request.get(`/destinations/${validLocationID}`)
        expect(response.status).toBe(200)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that GET /destinations returns 400 on invalid id", async () => {
        const response = await request.get("/destinations/noID")
        expect(response.status).toBe(400)
    })

    it("should test that GET /destinations returns 404 on id not found", async () => {
        const response = await request.get("/destinations/60bc1808ae33b80015046cc5")
        expect(response.status).toBe(404)
    })

    // DEL:ID
    // 204 Gone
    // 400 invalid format
    // 404 not found

    it("should test that DELETE /destinations returns 204 on valid entry", async () => {
        const response = await request.delete(`/destinations/${validLocationID}`)
        expect(response.status).toBe(204)
    })

    it("should test that DELETE /destinations returns 400 on invalid id", async () => {
        const response = await request.delete("/destinations/noID")
        expect(response.status).toBe(400)
    })

    it("should test that DELETE /destinations returns 404 on id not found", async () => {
        const response = await request.delete("/destinations/60bc1808ae33b80015046cc5")
        expect(response.status).toBe(404)
    })

    afterAll(done => {
        mongoose.connection.dropDatabase().then(() => {
            mongoose.connection.close().then(done)
        })
    })
})
