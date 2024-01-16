import express from "express"
import cors from "cors"

const port = 8000
const app = express()

app.use(cors())

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello world" })
})

app.listen(port, () => {
  console.log(`Server is runnning on ${port} port`)
})
