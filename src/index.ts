import list from "express-list-endpoints"
import mongoose from "mongoose"
import server from "./server"

process.env.TS_NODE_DEV && require("dotenv").config()
const port = process.env.PORT || 3030

const { ATLAS_URL } = process.env
if (!ATLAS_URL) throw new Error("No Atlas URL specified")

mongoose
    .connect(ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.listen(port, () => {
            console.table(list(server))
            console.log("Server listening on port", port)
        })
    })
    .catch(e => console.log(e))
