import supertest from "supertest"
import server from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { response } from "express"
import { Accommodation, Location } from "../interfaces"

dotenv.config()
const request = supertest(server)

const { ATLAS_TEST_URL } = process.env

describe("All Routes", () => {
    let validAccomodationID = ""
    let validLocationID = ""

    const validAccomodationEntry: Accommodation = {
        name: "Test Entry",
        description: "Test Description",
        location: validLocationID,
        maxGuest: 420
    }
    const invalidAccomodationEntry = {
        description: true,
        location: { city: 5 },
        maxGuest: "420"
    }
    const modifiedAccomodationEntry = { name: "Modifed Name" }

    const validDestinationEntry: Location = { city: "Test City" }
    const invalidDestinationEntry = { city: true }
    const modifiedDestinationEntry = { city: "Modifed City" }

    beforeAll(async () => {
        mongoose.connect(ATLAS_TEST_URL! + "/discard", { useNewUrlParser: true, useUnifiedTopology: true })
        const location = await request.post("/destinations").send(validDestinationEntry)
        validLocationID = location.body._id
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
        const response = await request.post("/accomodation").send(validAccomodationEntry)

        expect(response.status).toBe(201)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that POST /accomodation returns 400 on invalid data", async () => {
        const responseA = await request.post("/accomodation").send(invalidAccomodationEntry)
        const responseB = await request.post("/accomodation").send({})

        expect(responseA.status).toBe(400)
        expect(responseB.status).toBe(400)
    })

    // PUT:ID
    // expect edit of accomodation
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that PUT /accomodation returns 200 on valid entry", async () => {
        const response = await request.put(`/accommodation/${validAccomodationID}`).send(modifiedAccomodationEntry)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Modified Name")
    })

    it("should test that PUT /accomodation returns 400 on invalid entry", async () => {
        const response = await request.put(`/accommodation/${validAccomodationID}`).send(invalidAccomodationEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /accomodation returns 400 on invalid id", async () => {
        const response = await request.put(`/accommodation/VOIDVOIDVOID`).send(modifiedAccomodationEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /accomodation returns 404 on not found", async () => {
        const response = await request.put("/accommodation/60bc1808ae33b80015046cc5").send(modifiedAccomodationEntry)
        expect(response.status).toBe(404)
    })

    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that GET /accomodation returns 200 on valid entry", async () => {
        const response = await request.get(`/accommodation/${validAccomodationID}`)
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
        const response = await request.delete(`/accommodation/${validAccomodationID}`)
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

    it("should test that GET /destinations returns 200", async () => {
        const response = await request.get("/destinations")
        expect(response.status).toBe(200)
        expect(response.body.result.length).toBe(1)
    })

    // POST
    // expect post a new accomodation
    // 400 if invalid data
    // 201 Created

    it("should test that POST /destination returns 201 on valid data", async () => {
        const response = await request.post("/destination").send(validDestinationEntry)

        expect(response.status).toBe(201)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that POST /destination returns 400 on invalid data", async () => {
        const responseA = await request.post("/destination").send(invalidDestinationEntry)
        const responseB = await request.post("/destination").send({})

        expect(responseA.status).toBe(400)
        expect(responseB.status).toBe(400)
    })

    // PUT:ID
    // expect edit of accomodation
    // 200 ok
    // 400 invalid format
    // 404 not found

    it("should test that PUT /destinations returns 200 on valid entry", async () => {
        const response = await request.put(`/destinations/${validAccomodationID}`).send(modifiedDestinationEntry)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Modified Name")
    })

    it("should test that PUT /destinations returns 400 on invalid entry", async () => {
        const response = await request.put(`/destinations/${validAccomodationID}`).send(invalidAccomodationEntry)
        expect(response.status).toBe(400)
    })

    it("should test that PUT /destinations returns 400 on invalid id", async () => {
        const response = await request.put(`/destinations/VOIDVOIDVOID`).send(modifiedDestinationEntry)
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
        const response = await request.get("/destinations/" + validAccomodationID)
        expect(response.status).toBe(200)
        expect(typeof response.body._id).toBe("string")
    })

    it("should test that GET /destinations returns 400 on invalid id", async () => {
        const response = await request.get("/destinations/VOIDVOIDVOID")
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
        const response = await request.delete("/destinations/" + validAccomodationID)
        expect(response.status).toBe(204)
    })

    it("should test that DELETE /destinations returns 400 on invalid id", async () => {
        const response = await request.delete("/destinations/VOIDVOIDVOID")
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
