"use client"

import { Button, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import CreateSupportTicketModal from "./components/modal"
import axios from "axios"
import RowWrapper from "./components/rowWrapper"
import FilterSection from "./components/filter"
import SortSection from "./components/sort"

export default function SupportTicket() {
  const [getTicket, setTicket] = useState([])
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const getTicketInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND as string
      const data = await axios.get(`${url}/api/support-tickets`)
      setTicket(data.data.data)
    } catch (error) {
      console.log("Error while fetching ticket", error)
    }
  }

  useEffect(() => {
    getTicketInfo()
  }, [])

  const heading = [
    "Topic",
    "Description",
    "Date Created",
    "Severity",
    "Type",
    "Assigned To",
    "Status",
    "Resolved On",
  ]

  return (
    <div className="flex min-h-screen flex-col items-center p-24 text-slate-400">
      <div className=" pb-8">
        <Button
          onClick={handleOpen}
          variant="contained"
          style={{ color: "black", fontSize: 15, fontWeight: "bold" }}
        >
          Creat Support Ticket
        </Button>
      </div>
      <CreateSupportTicketModal
        openModal={open}
        closeModal={handleClose}
        refetch={getTicketInfo}
      />
      <div className="py-2 flex justify-end w-full">
        <FilterSection setTicket={setTicket} />
      </div>
      <div className="w-full">
        <table className="w-full border-solid border-black border">
          <thead>
            <tr>
              {heading.map((head, index) => {
                return (
                  <th
                    key={index}
                    className=" border-solid border-black border relative"
                  >
                    {head}
                    {(head === "Date Created" || head === "Resolved On") && (
                      <SortSection
                        getTicket={getTicket}
                        setTicket={setTicket}
                        id={head}
                      />
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {getTicket.length > 0 &&
              getTicket.map((ticketInfo, index) => {
                return (
                  <RowWrapper
                    key={index}
                    ticket={ticketInfo}
                    refetch={getTicketInfo}
                  />
                )
              })}
          </tbody>
        </table>
        {getTicket.length === 0 && (
          <div className=" pt-4 flex justify-center">
            {/* <CircularProgress /> */}
            There is no Ticket in the System
          </div>
        )}
      </div>
    </div>
  )
}
