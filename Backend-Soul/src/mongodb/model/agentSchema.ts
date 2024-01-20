import mongoose, { Document, Model, Schema } from "mongoose"

interface AgentSchemaInterface extends Document {
  name: string
  email: string
  phone: string
  description: string
  active: boolean
  dateCreated: Date
}

const agentSchema: Schema<AgentSchemaInterface> = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

const Agent: Model<AgentSchemaInterface> =
  mongoose.models.agents ||
  mongoose.model<AgentSchemaInterface>("agents", agentSchema)

export default Agent
