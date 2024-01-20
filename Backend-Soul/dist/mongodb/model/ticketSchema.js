"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TgentSchema = new mongoose_1.default.Schema({
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
});
const Ticket = mongoose_1.default.models.tickets ||
    mongoose_1.default.model("tickets", TgentSchema);
exports.default = Ticket;
//# sourceMappingURL=ticketSchema.js.map