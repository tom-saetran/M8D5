import cors from "cors"
import express from "express"

process.env.TS_NODE_DEV && require("dotenv").config()

const server = express()

server.use(cors())
server.use(express.json())

export default server
