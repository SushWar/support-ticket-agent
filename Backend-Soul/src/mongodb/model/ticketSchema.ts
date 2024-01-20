import mongoose, { Document, Model, Schema } from "mongoose"

export interface TickteSchemaInterface extends Document {
  topic: string
  type: string
  severity: string
  description: string
  assignedTo: string
  dateCreated: Date
  status: string
  resolvedOn: Date | null
  [key: string]: any // Index signature
}

const TgentSchema: Schema<TickteSchemaInterface> = new mongoose.Schema({
  topic: {
    type: String,
  },
  type: {
    type: String,
  },
  severity: {
    type: String,
  },
  description: {
    type: String,
  },
  assignedTo: {
    type: String,
    default: null,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "New",
  },
  resolvedOn: {
    type: Date,
    default: null,
  },
})

const Ticket: Model<TickteSchemaInterface> =
  mongoose.models.tickets ||
  mongoose.model<TickteSchemaInterface>("tickets", TgentSchema)

export default Ticket
