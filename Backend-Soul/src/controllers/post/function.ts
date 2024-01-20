import { Request, Response } from "express"
import Agent from "../../mongodb/model/agentSchema"
import { CreateAgent, CreateTicket } from "interface"
import Ticket from "../../mongodb/model/ticketSchema"
import { assignTicket } from "../../components/function"

const createAgent = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, description } = req.body as CreateAgent
    const query = {
      $or: [{ email: email }, { phone: phone }],
    }
    const duplicate = await Agent.find(query)

    if (duplicate.length >= 2) {
      return res.json({ error: "Email and Phone number already exist !!" })
    } else if (duplicate.length === 1) {
      if (duplicate[0].email === email) {
        return res.json({
          error: "Email already exist !!",
        })
      } else {
        return res.json({
          error: "Phone number already exist !!",
        })
      }
    } else {
      const newAgent = new Agent({
        name: name,
        email: email,
        phone: phone,
        description: description,
      })
      const saveAgent = await newAgent.save()
      return res.json({ data: saveAgent })
    }
  } catch (error) {
    console.log("Error occured while creating support Agent", error)
    return res.json({
      error: "Create Agent request Failed, Try again after some time",
    })
  }
}

const createTicket = async (req: Request, res: Response) => {
  try {
    const { topic, description, type, severity } = req.body as CreateTicket
    const duplicate = await Ticket.findOne({
      topic: topic,
      description: description,
      type: type,
      severity: severity,
    })
    if (duplicate !== null && duplicate.resolvedOn === null) {
      return res.json({
        error: "The same request already exist in the system",
      })
    }

    const createTicket = new Ticket({
      topic: topic,
      description: description,
      type: type,
      severity: severity,
    })

    const saveTicket = await createTicket.save()
    await assignTicket(saveTicket._id) //This will auto Assign the agent. If agent is not active then it will run it again after 30 seconds
    return res.json({ data: saveTicket })
  } catch (error) {
    console.log("Error occured while creating support ticket", error)
    return res.json({
      error: "Create ticket request Failed, Try again after some time",
    })
  }
}

export { createAgent, createTicket }
