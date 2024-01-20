import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import * as dotenv from "dotenv"
import { route } from "./routes/routing"
import { connect } from "./mongodb/dbconfig"

const main = async () => {
  const port = process.env.PORT || 8080
  dotenv.config()
  const app = express()
  await connect() //Starting MongoDB connection

  const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true,
  }

  app.use(cors<cors.CorsRequest>(corsOptions))

  app.use(bodyParser.json())
  app.use("/", route)

  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })
}

main().catch((err) => console.log(err))
