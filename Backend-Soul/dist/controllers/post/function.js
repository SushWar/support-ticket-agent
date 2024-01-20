"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = exports.createAgent = void 0;
const agentSchema_1 = __importDefault(require("../../mongodb/model/agentSchema"));
const ticketSchema_1 = __importDefault(require("../../mongodb/model/ticketSchema"));
const function_1 = require("../../components/function");
const createAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, description } = req.body;
        const query = {
            $or: [{ email: email }, { phone: phone }],
        };
        const duplicate = yield agentSchema_1.default.find(query);
        if (duplicate.length >= 2) {
            return res.json({ error: "Email and Phone number already exist !!" });
        }
        else if (duplicate.length === 1) {
            if (duplicate[0].email === email) {
                return res.json({
                    error: "Email already exist !!",
                });
            }
            else {
                return res.json({
                    error: "Phone number already exist !!",
                });
            }
        }
        else {
            const newAgent = new agentSchema_1.default({
                name: name,
                email: email,
                phone: phone,
                description: description,
            });
            const saveAgent = yield newAgent.save();
            return res.json({ data: saveAgent });
        }
    }
    catch (error) {
        console.log("Error occured while creating support Agent", error);
        return res.json({
            error: "Create Agent request Failed, Try again after some time",
        });
    }
});
exports.createAgent = createAgent;
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topic, description, type, severity } = req.body;
        const duplicate = yield ticketSchema_1.default.findOne({
            topic: topic,
            description: description,
            type: type,
            severity: severity,
        });
        if (duplicate !== null && duplicate.resolvedOn === null) {
            return res.json({
                error: "The same request already exist in the system",
            });
        }
        const createTicket = new ticketSchema_1.default({
            topic: topic,
            description: description,
            type: type,
            severity: severity,
        });
        const saveTicket = yield createTicket.save();
        yield (0, function_1.assignTicket)(saveTicket._id); //This will auto Assign the agent. If agent is not active then it will run it again after 30 seconds
        return res.json({ data: saveTicket });
    }
    catch (error) {
        console.log("Error occured while creating support ticket", error);
        return res.json({
            error: "Create ticket request Failed, Try again after some time",
        });
    }
});
exports.createTicket = createTicket;
//# sourceMappingURL=function.js.map