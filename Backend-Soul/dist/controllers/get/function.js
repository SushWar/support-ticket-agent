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
exports.getAllTicket = void 0;
const ticketSchema_1 = __importDefault(require("../../mongodb/model/ticketSchema"));
const function_1 = require("../../components/function");
const getAllTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        const getTicket = yield ticketSchema_1.default.find({});
        let len = Object.keys(req.query).length;
        if (len > 0) {
            if (len === 4) {
                let filterOutput = (0, function_1.filterQuery)(getTicket, filter);
                return res.json({ data: filterOutput });
            }
            else {
                const sortEnter = req.query;
                let sortOutput = (0, function_1.mergeSort)(getTicket, sortEnter.sortType, sortEnter.sortOrder);
                return res.json({ data: sortOutput });
            }
        }
        return res.json({ data: getTicket });
    }
    catch (error) {
        console.log("Error while geting Ticket", error);
        return res.json({ error: "Error while fetching the request" });
    }
});
exports.getAllTicket = getAllTicket;
//# sourceMappingURL=function.js.map