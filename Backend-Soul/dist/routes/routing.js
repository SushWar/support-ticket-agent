"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const function_1 = require("../controllers/post/function");
const function_2 = require("../controllers/get/function");
const route = express_1.default.Router();
exports.route = route;
route.get("/api/support-tickets", function_2.getAllTicket); // Get All Ticket info
route.post("/api/support-agents", function_1.createAgent); // Create Support Agent
route.post("/api/support-tickets", function_1.createTicket); // Create Support Ticket
//# sourceMappingURL=routing.js.map