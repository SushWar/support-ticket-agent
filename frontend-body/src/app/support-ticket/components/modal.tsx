import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material"
import { severity } from "./constant"
import { useState } from "react"
import { cleanInput, isMaliciousCode } from "@/components/validate"
import axios from "axios"
import toast from "react-hot-toast"

interface checking {
  openModal: boolean
  closeModal: () => void
  refetch: () => void
}

export default function CreateSupportTicketModal({
  openModal,
  closeModal,
  refetch,
}: checking) {
  const [ticketInfo, setTicketInfo] = useState({
    topic: "",
    description: "",
    severity: "",
    type: "",
  })
  const onChange = (e: any) => {
    const { name, value } = e.target

    setTicketInfo({ ...ticketInfo, [name]: cleanInput(value) })
  }
  const isMalicious = (): boolean => {
    const testtopic = isMaliciousCode(ticketInfo.topic)
    const testDescription = isMaliciousCode(ticketInfo.description)
    const testType = isMaliciousCode(ticketInfo.type)

    return testtopic && testDescription && testType
  }

  const createTicket = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (isMalicious()) {
        toast.error("Malicious code is present")
      } else {
        const url = process.env.NEXT_PUBLIC_BACKEND as string
        const data = await axios.post(`${url}/api/support-tickets`, ticketInfo)
        closeModal()

        if (data.data.error) {
          toast.error(data.data.error)
        } else {
          toast.success("Support Ticket successfully created")
          setTimeout(() => {
            refetch()
          }, 5000)
        }
      }
    } catch (error) {
      console.log("Error while submitting form", error)
      toast.error("Please try after some time !!")
    }
  }

  return (
    <>
      <Dialog open={openModal} onClose={closeModal}>
        <DialogTitle>Create Support</DialogTitle>
        <DialogContent>
          <form onSubmit={createTicket} className=" py-4">
            <TextField
              select
              required
              label="Severity"
              name="severity"
              value={ticketInfo.severity}
              onChange={onChange}
              defaultValue="Low"
              fullWidth
            >
              {severity.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              required
              margin="dense"
              name="topic"
              label="Topic"
              type="text"
              value={ticketInfo.topic}
              onChange={onChange}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="type"
              label="Type"
              type="text"
              value={ticketInfo.type}
              onChange={onChange}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              multiline
              rows={4}
              margin="dense"
              name="description"
              label="Description"
              type="text"
              value={ticketInfo.description}
              onChange={onChange}
              fullWidth
              variant="standard"
            />

            <div className="flex gap-4 justify-end pt-4">
              <button
                onClick={closeModal}
                className=" text-gray-700 hover:bg-slate-100 p-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" text-blue-500 hover:bg-blue-100 p-2 rounded-md"
              >
                Create
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
