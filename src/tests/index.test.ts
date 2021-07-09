import supertest from "supertest"
import server from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { Accommodation, Location } from "../interfaces"

dotenv.config()
const request = supertest(server)

const { ATLAS_URL } = process.env

describe("All Routes", () => {
    beforeAll(async () => {
        mongoose.connect(ATLAS_URL! + "/discard", { useNewUrlParser: true, useUnifiedTopology: true })
        const location = await request.post("/destinations").send(validDestinationEntry)
        validDestinationEntry.city = location.body._id

        const accommodation = await request.post("/accommodation").send()
        global.validAccommodationID = accommodation.body._id
    })

    const validAccommodationEntry: Accommodation = {
        name: "Test Entry",
        description: "Test Description",
        location: "",
        maxGuests: 666
    }
    const invalidAccommodationEntry = {
        description: false,
        location: 51,
        maxGuests: "Nine"
    }
    const modifiedAccommodationEntry = { name: "Modified Name" }

    const validDestinationEntry: Location = { city: "Test City" }
    const invalidDestinationEntry = { city: null }
    const modifiedDestinationEntry = { city: "Modifed City" }

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
        const response = await request.post("/destinations").send(invalidDestinationEntry)
        expect(response.status).toBe(400)
    })

    // PUT:ID
    // expect edit of accommodation
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that PUT /destinations returns 200 on valid entry", async () => {
        const response = await request.put(`/destinations/${validDestinationEntry.city}`).send(modifiedDestinationEntry)
        expect(response.status).toBe(200)
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
        const response = await request.get(`/destinations/${validDestinationEntry.city}`)
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
        const response = await request.delete(`/destinations/${validDestinationEntry.city}`)
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

    // ROUTE ACCOMMODATION
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
        const location = await request.post("/destinations").send(validDestinationEntry)
        validDestinationEntry.city = location.body._id

        const response = await request.post("/accommodation").send(validAccommodationEntry)
        expect(response.status).toBe(201)

        validAccommodationID = response.body._id
    })

    it("should test that POST /accommodation returns 400 on invalid data", async () => {
        const responseA = await request.post("/accommodation").send(invalidAccommodationEntry)
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
        const response = await request.put(`/accommodation/${validAccommodationID}`).send(modifiedAccommodationEntry)
        expect(response.status).toBe(200)
    })

    it("should test that PUT /accommodation returns 400 on invalid id", async () => {
        const response = await request.put(`/accommodation/noID`).send(modifiedAccommodationEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /accommodation returns 404 on not found", async () => {
        const response = await request.put("/accommodation/60bc1808ae33b80015046cc5").send(modifiedAccommodationEntry)
        expect(response.status).toBe(404)
    })

    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that GET /accommodation returns 200 on valid entry", async () => {
        const response = await request.get(`/accommodation/${validAccommodationID}`)
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
        const response = await request.delete(`/accommodation/${validAccommodationID}`)
        expect(response.status).toBe(204)
        console.log(validAccommodationID)
    })

    it("should test that DELETE /accommodation returns 400 on invalid id", async () => {
        const response = await request.delete("/accommodation/noID")
        expect(response.status).toBe(400)
    })

    it("should test that DELETE /accommodation returns 404 on id not found", async () => {
        const response = await request.delete("/accommodation/60bc1808ae33b80015046cc5")
        expect(response.status).toBe(404)
    })

    afterAll(done => {
        mongoose.connection.dropDatabase().then(() => {
            mongoose.connection.close().then(done)
        })
    })
})
