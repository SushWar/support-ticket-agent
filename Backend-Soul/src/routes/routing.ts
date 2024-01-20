import express from "express"
import { createAgent, createTicket } from "../controllers/post/function"
import { getAllTicket } from "../controllers/get/function"

const route = express.Router()

route.get("/api/support-tickets", getAllTicket) // Get All Ticket info
route.post("/api/support-agents", createAgent) // Create Support Agent
route.post("/api/support-tickets", createTicket) // Create Support Ticket

export { route }
