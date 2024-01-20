import Agent from "../mongodb/model/agentSchema"
import Ticket, { TickteSchemaInterface } from "../mongodb/model/ticketSchema"
import { FilterQuery } from "interface"
const assignTicket = async (ticketId: string) => {
  try {
    const activeAgents = await Agent.find({ active: true })

    if (activeAgents.length === 0) {
      console.log("No agent available. Retrying in 1 min.....")
      setTimeout(() => {
        assignTicket(ticketId)
      }, 60000)
      return
    }

    const nextAgent = activeAgents[0]

    await Agent.updateOne({ _id: nextAgent._id }, { active: false })

    const updateTicketAgent = await Ticket.updateOne(
      { _id: ticketId },
      { assignedTo: nextAgent.name, status: "Assigned" }
    )

    console.log(`Ticket ${ticketId} assigned to agent ${nextAgent.name}`)
    return
  } catch (error) {
    console.log("Inside Assign ticket --> 6")
    console.log("Error running assign Ticket function", error)
    return
  }
}

const mergeSort = (
  data: TickteSchemaInterface[],
  sortType: string,
  sortOrder: string
): TickteSchemaInterface[] => {
  if (data.length <= 1) {
    return data
  }

  const middle = Math.floor(data.length / 2)
  const left = mergeSort(data.slice(0, middle), sortType, sortOrder)
  const right = mergeSort(data.slice(middle), sortType, sortOrder)

  return merge(left, right, sortType, sortOrder)
}

const merge = (
  left: TickteSchemaInterface[],
  right: TickteSchemaInterface[],
  sortType: string,
  sortOrder: string
): TickteSchemaInterface[] => {
  const result: TickteSchemaInterface[] = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (sortOrder === "true") {
      if (left[leftIndex][sortType] <= right[rightIndex][sortType]) {
        result.push(left[leftIndex])
        leftIndex++
      } else {
        result.push(right[rightIndex])
        rightIndex++
      }
    } else {
      if (left[leftIndex][sortType] >= right[rightIndex][sortType]) {
        result.push(left[leftIndex])
        leftIndex++
      } else {
        result.push(right[rightIndex])
        rightIndex++
      }
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

const filterQuery = (
  getTicket: TickteSchemaInterface[],
  filter: FilterQuery
): TickteSchemaInterface[] => {
  let filterOutput: TickteSchemaInterface[] = []

  for (let i = 0; i < getTicket.length; i++) {
    let count = 0
    let check = 0
    for (let key in filter) {
      if (filter[key] !== "") {
        check++

        if (getTicket[i][key] === filter[key]) {
          count++
        }
      }
    }
    if (count === check) {
      filterOutput.push(getTicket[i])
    }
  }
  return filterOutput
}

export { assignTicket, filterQuery, mergeSort }
