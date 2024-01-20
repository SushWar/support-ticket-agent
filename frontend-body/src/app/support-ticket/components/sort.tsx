import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"
import axios from "axios"
import { Dispatch, SetStateAction, useState } from "react"

export default function SortSection({
  setTicket,
  getTicket,
  id,
}: {
  setTicket: any
  getTicket: Object[]
  id: string
}) {
  const [get, set] = useState<boolean | null>(null)

  interface GetSetId {
    name: string
    value?: boolean | null
    setValue?: Dispatch<SetStateAction<boolean | null>>
  }

  let getId: GetSetId = {
    name: id === "Date Created" ? "dateCreated" : "resolvedOn",
  }
  let setId: GetSetId = {
    name: `set-${id}`,
  }

  getId.value = get
  setId.setValue = set

  const sortQuery = async (order: boolean) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND as string
      const data = await axios.get(`${url}/api/support-tickets`, {
        params: { sortType: getId.name, sortOrder: order },
      })

      setTicket(data.data.data)
    } catch (error) {
      console.log("Error while fetching ticket", error)
    }
  }

  return (
    <div>
      <div>
        <div className="absolute top-0 left-0">
          <span
            className=" cursor-pointer"
            onClick={() => {
              sortQuery(false)
            }}
          >
            <ChangeHistoryIcon
              style={{
                fill: "red",
              }}
            />
          </span>
        </div>
      </div>
      <div className=" absolute top-0 right-0">
        <div>
          <span
            className=" cursor-pointer"
            onClick={() => {
              sortQuery(true)
            }}
          >
            <ChangeHistoryIcon
              style={{
                transform: "rotate(180deg)",
                fill: "green",
              }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
