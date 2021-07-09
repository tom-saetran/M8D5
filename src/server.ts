import cors from "cors"
import express from "express"
import accommodationRoute from "./endpoints/accommodation"
import destinationsRoute from "./endpoints/destinations"

process.env.TS_NODE_DEV && require("dotenv").config()

const server = express()

server.use(cors())
server.use(express.json())

server.use("/accommodation", accommodationRoute)
server.use("/destinations", destinationsRoute)

export default server
