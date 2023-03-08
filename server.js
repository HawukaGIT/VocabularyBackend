import express from "express"
import cors from "cors"
//route
import lists from "./api/lists.route.js"

const app = express()

app.use(cors())
app.use(express.json())
//route
app.use("/api/v1/lists", lists)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
