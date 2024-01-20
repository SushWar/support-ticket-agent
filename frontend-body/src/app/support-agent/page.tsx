"use client"
import { Button, TextField } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import {
  cleanInput,
  isMaliciousCode,
  validateEmail,
  validatePhone,
} from "@/components/validate"
import toast from "react-hot-toast"

export default function SuppotAgent() {
  const [getAgent, setAgent] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  })

  const onChange = (e: any) => {
    const { name, value } = e.target

    setAgent({ ...getAgent, [name]: cleanInput(value) })
  }

  const isMalicious = (): boolean => {
    const testName = isMaliciousCode(getAgent.name)
    const testDescription = isMaliciousCode(getAgent.description)
    const testPhone = isMaliciousCode(getAgent.phone)
    const testEmail = isMaliciousCode(getAgent.email)

    return testName && testDescription && testPhone && testEmail
  }

  const createAgent = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (isMalicious()) {
        toast.error("Malicious code is present")
        return
      }
      const emaiValid = validateEmail(getAgent.email)
      const phoneValid = validatePhone(getAgent.phone)

      setErrors({
        email: emaiValid ? "" : "Invalid email",
        phone: phoneValid ? "" : "Invalid Phone number",
      })

      if (emaiValid && phoneValid) {
        const url = process.env.NEXT_PUBLIC_BACKEND as string
        const data = await axios.post(`${url}/api/support-agents`, getAgent)

        if (data.data.error) {
          toast.error(data.data.error)
        } else {
          toast.success("Support Agent successfully created")
        }
      }
    } catch (error) {
      console.log("Error while submitting form", error)
      toast.error("Please try after some time !!")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-slate-400">
      <div>
        <form id="createAgentForm" onSubmit={createAgent} method="post">
          <div className="flex flex-col gap-4">
            <div className=" pb-6">
              <span className=" text-2xl font-semibold">
                Create Support Agent
              </span>
            </div>
            <TextField
              required
              label="Name"
              name="name"
              value={getAgent.name}
              onChange={onChange}
            />
            <TextField
              required
              error={!!errors.email}
              helperText={errors.email}
              label="Email Address"
              name="email"
              type="email"
              value={getAgent.email}
              onChange={onChange}
            />
            <TextField
              required
              error={!!errors.phone}
              helperText={errors.phone}
              label="Phone number"
              name="phone"
              value={getAgent.phone}
              onChange={onChange}
            />
            <TextField
              required
              multiline
              rows={4}
              name="description"
              label="Description"
              value={getAgent.description}
              onChange={onChange}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ color: "black" }}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
