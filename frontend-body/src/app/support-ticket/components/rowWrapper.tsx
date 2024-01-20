interface Wrapper {
  ticket: {
    _id: string
    topic: string
    description: string
    dateCreated: string
    severity: string
    type: string
    assignedTo: string
    status: string
    resolvedOn: string
  }
  refetch: () => void
}

export default function RowWrapper({ ticket, refetch }: Wrapper) {
  if (ticket.assignedTo === null) {
    setTimeout(() => {
      refetch()
    }, 60000)
  }
  return (
    <tr>
      <td className=" border-solid border-black border">{ticket.topic}</td>
      <td className=" border-solid border-black border">
        {ticket.description}
      </td>
      <td className=" border-solid border-black border">
        {ticket.dateCreated.split("T")[0]}
      </td>
      <td className=" border-solid border-black border">{ticket.severity}</td>
      <td className=" border-solid border-black border">{ticket.type}</td>
      <td className=" border-solid border-black border">{ticket.assignedTo}</td>
      <td className=" border-solid border-black border">{ticket.status}</td>
      <td className=" border-solid border-black border">
        {ticket.resolvedOn ? ticket.resolvedOn : "Not yet"}
      </td>
    </tr>
  )
}
