import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" text-black text-4xl flex flex-col gap-4">
        <div className=" bg-slate-500 hover:bg-slate-400">
          <div className=" p-4">
            <Link href={"/support-agent"}>Create Support Agent</Link>
          </div>
        </div>
        <div className=" bg-slate-500 hover:bg-slate-400">
          <div className=" p-4">
            <Link href={"/support-ticket"}>Create Support Ticket</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
