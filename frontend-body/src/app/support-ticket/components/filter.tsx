import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { useState } from "react"
import { severity, statusOption } from "./constant"
import { cleanInput } from "@/components/validate"
import axios from "axios"

export default function FilterSection({ setTicket }: { setTicket: any }) {
  const [openSort, setOpenSort] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  return (
    <div>
      <Button
        onClick={() => {
          setOpenFilter(true)
        }}
        variant="contained"
        style={{ color: "black", fontSize: 15, fontWeight: "bold" }}
      >
        Filter
      </Button>
      <FilterUI
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        setTicket={setTicket}
      />
    </div>
  )
}

function FilterUI({
  openFilter,
  setOpenFilter,
  setTicket,
}: {
  openFilter: boolean
  setOpenFilter: (close: boolean) => void
  setTicket: any
}) {
  const [filterField, setField] = useState({
    status: "",
    assigned: "",
    severity: "",
    type: "",
  })

  const reset = () => {
    setField({ status: "", assigned: "", severity: "", type: "" })
  }

  const onChange = (e: any) => {
    const { name, value } = e.target

    setField({ ...filterField, [name]: cleanInput(value) })
  }

  const searchFilter = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND as string
      const data = await axios.get(`${url}/api/support-tickets`, {
        params: filterField,
      })
      console.log(data)
      setTicket(data.data.data)
      setOpenFilter(false)
    } catch (error) {
      console.log("Error while filtering", error)
    }
  }

  return (
    <>
      <Dialog
        open={openFilter}
        onClose={() => {
          setOpenFilter(false)
        }}
      >
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent style={{ paddingTop: "1rem" }}>
          <TextField
            select
            label="Status"
            name="status"
            value={filterField.status}
            onChange={onChange}
            defaultValue=""
            fullWidth
            style={{ paddingBottom: "1rem" }}
          >
            {statusOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Severity"
            name="severity"
            value={filterField.severity}
            onChange={onChange}
            defaultValue=""
            fullWidth
            style={{ paddingBottom: "1rem" }}
          >
            {severity.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            name="type"
            label="Type"
            type="text"
            value={filterField.type}
            onChange={onChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="assigned"
            label="Assigned"
            type="text"
            value={filterField.assigned}
            onChange={onChange}
            fullWidth
            variant="standard"
          />
          <div className="flex gap-4 justify-end pt-4">
            <button
              onClick={() => {
                setOpenFilter(false)
              }}
              className=" text-gray-700 hover:bg-slate-100 p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={reset}
              className=" text-stone-800 hover:bg-blue-100 p-2 rounded-md"
            >
              Reset
            </button>
            <button
              onClick={searchFilter}
              className=" text-blue-500 hover:bg-blue-100 p-2 rounded-md"
            >
              Search
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
