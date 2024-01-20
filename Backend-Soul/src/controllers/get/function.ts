import { Request, Response } from "express"
import Ticket, { TickteSchemaInterface } from "../../mongodb/model/ticketSchema"
import { CreateTicket, FilterQuery, SortQuery } from "interface"
import { filterQuery, mergeSort } from "../../components/function"
const getAllTicket = async (req: Request, res: Response) => {
  try {
    const filter = req.query

    const getTicket = await Ticket.find({})

    let len = Object.keys(req.query).length
    if (len > 0) {
      if (len === 4) {
        let filterOutput: TickteSchemaInterface[] = filterQuery(
          getTicket,
          filter
        )

        return res.json({ data: filterOutput })
      } else {
        const sortEnter = req.query

        let sortOutput: TickteSchemaInterface[] = mergeSort(
          getTicket,
          sortEnter.sortType as string,
          sortEnter.sortOrder as string
        )

        return res.json({ data: sortOutput })
      }
    }

    return res.json({ data: getTicket })
  } catch (error) {
    console.log("Error while geting Ticket", error)
    return res.json({ error: "Error while fetching the request" })
  }
}

export { getAllTicket }
